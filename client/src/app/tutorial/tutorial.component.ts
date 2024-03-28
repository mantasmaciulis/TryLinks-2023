import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TrylinksService } from '../trylinks.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client'; 
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import * as marked from 'marked';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss', './markdown.scss']
})
export class TutorialComponent implements OnInit, OnDestroy {
  socket: Socket | null = null;
  tutorialDescription: SafeHtml;
  source = '';
  editorOptions = {
    mode: 'links',
    theme: 'material',
    lineNumbers: true,
    autofocus: true,
    lineWrapping: true,
    indentWithTabs: true
  };
  compileError = '';
  port: number;
  renderUrl: SafeHtml;
  id: number;
  headers: any[];

  constructor(
    private sanitizer: DomSanitizer,
    private tryLinksService: TrylinksService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadTutorial();
  }

  ngOnDestroy() {
    // This is very important, otherwise listeners will build up on the server
    // and each time we submit something to /compile it will execute it another
    // time. Eventually, this will crash the server e.g. by the 8th compile req
    // The user's program will compile 8 times on the server.
    this.disconnectSocket();
  }

  loadTutorial() {
    this.tryLinksService.getTutorialHeaders().subscribe(headers => {
      this.headers = headers;
      this.id = (this.route.snapshot.paramMap.get('id') as unknown) as number;
      this.tryLinksService
        .getTutorialDesc(this.id)
        .subscribe(async (description: string) => {
          if (description.length === 0) {
            this.tryLinksService
              .getDefaultTutorialId()
              .subscribe((defaultId: number) => {
                this.router.navigate(['tutorial', defaultId]);
              });
            return;
          }
          await this.convertMarkdownToHtml(description);
          this.tryLinksService.getTutorialSource(this.id).subscribe(source => {
            if (source === '') {
              this.router.navigate(['dashboard']);
            } else {
              this.source = source;
              this.tryLinksService
                .updateUser(this.id)
                .subscribe((isSuccessful: boolean) => {
                  if (isSuccessful) {
                  } else {
                  }
                });
            }
          });
        });
    });
  }
  //Tutorial descriptions from the server are retrieved in markdown format.
  async convertMarkdownToHtml(description: string): Promise<void> {
    const htmlContent = await marked.parse(description);
    this.tutorialDescription = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }
  
  onCompile(): void {
    this.dialog.open(LoadingDialogComponent);
  
    this.tryLinksService.saveTutorialSource(this.id, this.source).subscribe(_ => {
      this.tryLinksService.compileAndDeploy().subscribe(socketPath => {
        if (!socketPath) {
          this.dialog.closeAll();
          return;
        }
  
        if (this.socket && this.socket.connected) {
          //This modification is required to let the compile and deploy pipeline know on the
          //server which tutorial we want to compile, as the scope for a websocket listener
          //is just itself.
          this.socket.emit('compile', { tutorialId: this.tryLinksService.lastTutorialId });

        } else {
          //We only setup a new websocket connection in cases where the old one has been closed.
          this.setupNewSocketConnection(socketPath);
        }
      });
    });
  }

  setupNewSocketConnection(socketPath: string): void {
    const namespace = TrylinksService.serverAddr + socketPath;
    //Another check to prevent the buildup of listeners, only *ONE* socket should ever be established
    //per user.
    this.disconnectSocket();
    this.socket = io(namespace);
  
    this.socket.on('connect', () => {
      this.registerSocketEventListeners();
      this.socket.emit('compile', { tutorialId: this.tryLinksService.lastTutorialId });
    });
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  registerSocketEventListeners(): void {
    if (!this.socket) return;
  
    this.socket.on('compiled', (port: number) => {
      this.dialog.closeAll();
      this.port = port;
      this.renderUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${TrylinksService.serverAddr.replace('//', `//${port}.`)}/`
      );
    });
  
    this.socket.on('compile error', (error: string) => {
      this.compileError = error;
      this.port = null;
      this.dialog.closeAll();
    });
  
    this.socket.on('shell error', (error: string) => {
      this.compileError = error;
      this.port = null;
      this.dialog.closeAll();
    });
  }

  navToTutorial(i) {
    this.id = i;
    this.port = null;
    this.router.navigate(['tutorial', i]);
    this.loadTutorial();
  }

  navToDashboardPage(): void {
    this.router.navigate(['dashboard']);
  }

  navToInteractivePage(): void {
    this.router.navigate(['interactive']);
  }

}
