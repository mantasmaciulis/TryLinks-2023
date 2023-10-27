import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentInit, OnDestroy } from '@angular/core';
import { ShellLineModel, LineType } from '../shell-line/shell-line.model';
import starterGuideDescriptions from './interactive.guide';
import { TrylinksService } from '../trylinks.service';
import { Router } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('shell') shell: any;

  inputPrompt = ' links> ';
  allLines: ShellLineModel[];
  currentCmd = '';
  currentInputLine = '';
  introIndex: number;
  socket: Socket;

  constructor(
    private tryLinksService: TrylinksService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.allLines = [];
    this.introIndex = 0;
  }

  ngAfterContentInit() {
    this.dialog.open(LoadingDialogComponent);
    this.cdRef.detectChanges();
    this.tryLinksService.startInteractiveMode().subscribe(
      (socketPath) => {
        if (socketPath === '') {
          this.dialog.closeAll();
          this.router.navigate(['dashboard']);
          return;
        }

        const namespace = TrylinksService.serverAddr + socketPath;
        this.socket = io(namespace);

        this.socket.on('connect_error', (error) => console.log(error));
        this.socket.on('connect', () => {
          this.introIndex = 0;
          this.socket.on('shell output', (output: string) => {
            if (this.dialog.openDialogs && this.dialog.openDialogs !== undefined && this.dialog.openDialogs.length > 0) {
              this.dialog.closeAll();
              this.showNewGuide();
            }
            this.allLines.push(new ShellLineModel(
                LineType.stdout, output.replace('\<stdin\>', 'line')));
          });

          this.socket.on('shell error', (error: string) => {
            this.allLines.push(new ShellLineModel(
                LineType.stderr, error.replace('\<stdin\>', 'line')));
          });
    });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onInputChange(): void {
    this.currentCmd += '\n' + this.currentInputLine;
    if (this.currentCmd.trim() === 'skip intro;') {
      this.allLines.push(
        new ShellLineModel(
          LineType.stdout,
          'Syntax introduction series disabled. To enable, please refresh the page.'
        )
      );
      this.currentCmd = '';
    } else if (this.currentCmd.trim() === 'next tip;') {
      this.showNewGuide();
      this.currentCmd = '';
    } else if (this.currentCmd.trim() === 'go back;') {
      this.introIndex = this.introIndex > 1 ? this.introIndex - 2 : 0;
      this.showNewGuide();
      this.currentCmd = '';
    } else {
      this.allLines.push(
        new ShellLineModel(LineType.userInput, this.currentInputLine)
      );
      if (this.currentInputLine.endsWith(';')) {
        this.currentCmd.split(';').forEach(command => {
          if (command.length > 0) {
            const commandToSent = command + ';';
            this.socket.emit('new command', command + ';');
          }
        });
        this.inputPrompt = ' links > ';
        this.currentCmd = '';
      } else {
        this.inputPrompt = '...... ';
      }
    }
    this.currentInputLine = '';
  }

  showNewGuide(): void {
    if (this.introIndex < starterGuideDescriptions.length) {
      this.allLines.push(
        new ShellLineModel(
          LineType.introduction,
          starterGuideDescriptions[this.introIndex]
        )
      );
      this.introIndex++;
    }
  }

  navToDashboardPage(): void {
    this.router.navigate(['dashboard']);
  }

  logout(): void {
    this.tryLinksService
      .logout()
      .subscribe(_ => this.router.navigate(['welcome']));
  }
}
