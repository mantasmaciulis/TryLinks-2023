import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TrylinksService } from '../trylinks.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client'; 
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { IconOptions } from '@angular/material/icon';
import * as marked from 'marked';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss', './markdown.scss']
})
export class TutorialComponent implements OnInit {
  // TODO(fix links styling in editor).
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
  socket: Socket;

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
  async convertMarkdownToHtml(description: string): Promise<void> {
    const htmlContent = await marked.parse(description);
    this.tutorialDescription = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }
  
  onCompile(): void {
    this.dialog.open(LoadingDialogComponent);
    this.tryLinksService
      .saveTutorialSource(this.id, this.source)
      .subscribe(_ => {
        this.tryLinksService.compileAndDeploy().subscribe(socketPath => {
          if (socketPath === '') {
            this.dialog.closeAll();
            return;
          }

          this.compileError = '';
          if (this.socket && this.socket.connected) {
            this.socket.emit('compile');
          } else {
            const namespace = TrylinksService.serverAddr + socketPath;
            this.socket = io(namespace);

            this.socket.on('connect', () => {
              this.socket.on('compiled', port => {
                this.dialog.closeAll();
                this.port = port;
                this.renderUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                  //we use http for user compiled apps.
                  TrylinksService.serverAddr + `/compile/${port}`
                );
              });

              this.socket.on('compile error', error => {
                this.compileError = error;
                this.port = null;
              });

              this.socket.on('shell error', error => {
                this.compileError = error;
                this.port = null;
              });
              
              this.socket.emit('compile');
            });
          }
        });
      });
  }

  navToTutorial(i) {
    this.id = i;
    this.port = null;
    if (this.socket != null) {
      this.socket.disconnect();
    }
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
