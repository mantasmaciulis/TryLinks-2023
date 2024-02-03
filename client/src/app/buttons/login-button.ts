import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect({
        appState: {
          target: '/dashboard',
        },
      });
      }
}