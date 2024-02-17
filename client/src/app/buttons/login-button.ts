import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  constructor(private router: Router) {}

  login() {
    //login automatically triggered via routeguards
    this.router.navigate(['/dashboard']);
      }
}