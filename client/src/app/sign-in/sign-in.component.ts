import { Component, OnInit } from '@angular/core';
import { TrylinksService } from '../trylinks.service';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup = this.fb.group({
    username: ['', Validators.pattern('[a-zA-Z0-9]*')],
    password: ['']
  });

  hidePassword = true;
  signInLoading = false;
  signInFailed = false;

  constructor(private fb: FormBuilder, private router: Router, private tryLinksService: TrylinksService) {}

  ngOnInit() {
  }

  onSignIn() {
    this.signInLoading = true;
    this.tryLinksService.login(this.username.value, this.password.value).subscribe(
      (isSuccessful: boolean) => {
        this.signInLoading = false;
        if (isSuccessful === true) {
          this.signInFailed = false;
          this.router.navigate(['dashboard']);
        } else {
          this.signInFailed = true;
          this.username.setErrors({incorrect: true});
          this.password.setErrors({incorrect: true});
        }
      }
    );
  }

  resetSignInError(): void {
    this.signInFailed = false;
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
