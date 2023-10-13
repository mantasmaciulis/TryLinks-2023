import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import { TrylinksService } from '../trylinks.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

export const passwordMatch: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordNotMatched: true }
    : null;
};

@Component({
  selector: 'app-sign-up-success-dialog',
  templateUrl: 'sign-up-success-dialog.html',
})
export class SignUpSuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SignUpSuccessDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formGroup = this.fb.group(
    {
      username: ['', Validators.pattern('[a-zA-Z0-9]*')],
      email: ['', Validators.email],
      password: [''],
      confirmPassword: ['']
    },
    { validators: passwordMatch }
  );

  hidePassword = true;
  signUpFailed = false;
  signUpLoading = false;

  constructor(
    private fb: FormBuilder,
    private tryLinksService: TrylinksService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  onSignUp(): void {
    if (this.formGroup.hasError('passwordNotMatched')) {
      return;
    }
    this.signUpLoading = true;
    this.tryLinksService
      .signup(this.username.value, this.email.value, this.password.value)
      .subscribe((isSuccessful: boolean) => {
        this.signUpLoading = false;
        if (isSuccessful === true) {
          this.dialog.open(SignUpSuccessDialogComponent);
        } else {
          this.signUpFailed = true;
          this.username.setErrors({ incorrect: true });
          this.email.setErrors({ incorrect: true });
          this.password.setErrors({ incorrect: true });
          this.confirmPassword.setErrors({ incorrect: true });
        }
      });
  }

  resetSignInError(): void {
    this.signUpFailed = false;
  }

  get username() {
    return this.formGroup.get('username');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
}
