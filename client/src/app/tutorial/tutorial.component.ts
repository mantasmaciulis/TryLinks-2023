import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TrylinksService } from '../trylinks.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as io from 'socket.io-client';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss', './markdown.scss']
})
export class TutorialComponent implements OnInit {
  // TODO(fix links styling in editor).
  tutorialDescription = '';
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
  socket: SocketIOClient.Socket;

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
        .subscribe((description: string) => {
          if (description.length === 0) {
            this.tryLinksService
              .getDefaultTutorialId()
              .subscribe((defaultId: number) => {
                this.router.navigate(['tutorial', defaultId]);
              });
            return;
          }

          this.tutorialDescription = description;
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
            this.socket = io.connect(namespace);

            this.socket.on('connect', _ => {
              this.socket.on('compiled', port => {
                this.dialog.closeAll();
                this.port = port;
                this.renderUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                  TrylinksService.serverURL + `:${port}`
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

  logout(): void {
    this.tryLinksService
      .logout()
      .subscribe(_ => this.router.navigate(['welcome']));
  }
}
