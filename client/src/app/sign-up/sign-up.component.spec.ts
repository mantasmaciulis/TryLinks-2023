import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpComponent } from './sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TrylinksService } from '../trylinks.service';
import { of } from 'rxjs';

fdescribe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let httpTestingController: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog, },
        { provide: TrylinksService, useClass: MockTrylinksService },
      ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the sign-up form with empty fields', () => {
    const form = component.formGroup;
    const usernameValue = form.get('username').value;
    const emailValue = form.get('email').value;
    const passwordValue = form.get('password').value;
    const confirmPasswordValue = form.get('confirmPassword').value;
  
    expect(form).toBeTruthy();
    expect(usernameValue).toEqual('');
    expect(emailValue).toEqual('');
    expect(passwordValue).toEqual('');
    expect(confirmPasswordValue).toEqual('');
  });

  it('should invalidate the form if passwords do not match', () => {
    component.formGroup.controls['password'].setValue('Password123');
    component.formGroup.controls['confirmPassword'].setValue('Password321');
    expect(component.formGroup.valid).toBeFalsy();
  });
  
  it('should validate the form if passwords match', () => {
    component.formGroup.controls['password'].setValue('Password123');
    component.formGroup.controls['confirmPassword'].setValue('Password123');
    expect(component.formGroup.valid).toBeTruthy();
  });
  // it('should invalidate the form when both password and confirm password are empty', () => {
  //   component.formGroup.controls['password'].setValue('');
  //   component.formGroup.controls['confirmPassword'].setValue('');
  //   expect(component.formGroup.valid).toBeFalsy();
  // });
  
  it('should invalidate the form when password is valid and confirm password is empty', () => {
    component.formGroup.controls['password'].setValue('ValidPass123');
    component.formGroup.controls['confirmPassword'].setValue('');
    expect(component.formGroup.valid).toBeFalsy();
  });
  
  it('should invalidate the form when password is empty and confirm password is valid', () => {
    component.formGroup.controls['password'].setValue('');
    component.formGroup.controls['confirmPassword'].setValue('ValidPass123');
    expect(component.formGroup.valid).toBeFalsy();
  });
  
  it('should validate the form when password and confirm password have minimum length and match', () => {
    component.formGroup.controls['password'].setValue('Pass12');
    component.formGroup.controls['confirmPassword'].setValue('Pass12');
    expect(component.formGroup.valid).toBeTruthy();
  });
  
  it('should validate the form when password contains special characters and matches confirm password', () => {
    component.formGroup.controls['password'].setValue('P@ssw0rd!');
    component.formGroup.controls['confirmPassword'].setValue('P@ssw0rd!');
    expect(component.formGroup.valid).toBeTruthy();
  });
  
  it('should validate the form when password is long and matches confirm password', () => {
    component.formGroup.controls['password'].setValue('ThisIsAVeryLongPassword12345');
    component.formGroup.controls['confirmPassword'].setValue('ThisIsAVeryLongPassword12345');
    expect(component.formGroup.valid).toBeTruthy();
  });
  
  it('should invalidate the form when password contains only letters and does not match confirm password', () => {
    component.formGroup.controls['password'].setValue('onlyLetters');
    component.formGroup.controls['confirmPassword'].setValue('stilljustletters');
    expect(component.formGroup.valid).toBeFalsy();
  });
  
  it('should validate the form when password contains only numbers and matches confirm password', () => {
    component.formGroup.controls['password'].setValue('12345678');
    component.formGroup.controls['confirmPassword'].setValue('12345678');
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should call TryLinks service with correct parameters when form is correctly filled out', () => {
  // Set form values to valid values
  component.formGroup.controls['username'].setValue('ValidUsername');
  component.formGroup.controls['email'].setValue('valid@email.com');
  component.formGroup.controls['password'].setValue('ValidPass123');
  component.formGroup.controls['confirmPassword'].setValue('ValidPass123');

  // Get a reference to the MockTrylinksService and spy on its signup method
  const trylinksService = TestBed.inject(TrylinksService);
  const signupSpy = spyOn(trylinksService, 'signup').and.callThrough();

  // Trigger the onSignUp method
  component.onSignUp();

  // Expect the signup method to have been called with the correct parameters
  expect(signupSpy).toHaveBeenCalledWith('ValidUsername', 'valid@email.com', 'ValidPass123');

  // Expect the signup method to return isSuccessful true
  signupSpy.calls.mostRecent().returnValue.subscribe(response => {
    expect(response.isSuccessful).toBeTruthy();
  });
});
  
});

class MockMatDialog {
  open() {
  }
}
class MockTrylinksService {
  signup(username: string, email: string, password: string) {
    // Mock the signup method here, e.g., return an Observable of a response
    return of({ isSuccessful: true }); // Modify as needed
  }
}

