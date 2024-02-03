import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';


import { AppRoutingModule } from './app-routing.module';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './start/start.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { ShellLineComponent } from './shell-line/shell-line.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { LoginButtonComponent } from './buttons/login-button';
import { LogoutButtonComponent } from './buttons/logout-button';
import { environment } from 'src/environments/environment.prod';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        StartComponent,
        DashboardComponent,
        InteractiveComponent,
        ShellLineComponent,
        TutorialComponent,
        LoadingDialogComponent,
        LoginButtonComponent,
        LogoutButtonComponent        
    ],
    imports: [
        BrowserModule,
        AuthModule.forRoot({
            domain: environment.auth.domain,
            clientId: environment.auth.clientId,
            cacheLocation: 'localstorage',
            authorizationParams: {
              redirect_uri: environment.auth.redirectUri,
              audience: environment.auth.jwt_check_audiance,
              scope: 'read:current_user',
            },
                      httpInterceptor: {
              allowedList: [
                {
                  uri: 'https://dev.trylinks.net/api/*',
                  tokenOptions: {
                    authorizationParams: {
                    audience: environment.auth.jwt_check_audiance,
                    scope: 'read:current_user'
                    }
                  }
                }
              ]
            }
          }),
        BrowserAnimationsModule,
        CodemirrorModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'connect.sid',
        }),
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
        AppRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
