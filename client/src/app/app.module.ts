import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './start/start.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent, SignUpSuccessDialogComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { ShellLineComponent } from './shell-line/shell-line.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        StartComponent,
        SignInComponent,
        SignUpComponent,
        DashboardComponent,
        InteractiveComponent,
        ShellLineComponent,
        TutorialComponent,
        SignUpSuccessDialogComponent,
        LoadingDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CodemirrorModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'connect.sid',
        }),
        MarkdownToHtmlModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        WebStorageModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
