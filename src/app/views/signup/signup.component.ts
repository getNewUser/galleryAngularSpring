import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { IUserRegistration } from 'src/app/models/userregistration.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  credentials: FormGroup = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    policy: new FormControl()
  });
  user: IUser = {
    name: '',
    username: '',
    password: '',
    email: ''
  };
  userRegistration: IUserRegistration;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  passwordValidator(form: FormGroup){
    const condition = form.get('password').value !== form.get('confirmPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(12)] ],
      username: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(12)] ],
      email: ['', [Validators.required, Validators.email]],
      password: [ '', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      policy: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordValidator
    });
  }

  onSubmit(message: string, action) { // here
    if ( this.credentials.controls['password'].value === this.credentials.controls['confirmPassword'].value) {
      console.log('match')
     
    }else {
      this.credentials.controls.password.setErrors({
        notMatched: true
      });
      console.log(this.credentials.errors);
      console.log('doesnt match');
    }
    if (this.credentials.invalid) {
      return;
    }
    this.userRegistration = this.credentials.value;
    this.user.email = this.userRegistration.email;
    this.user.name = this.userRegistration.name;
    this.user.username = this.userRegistration.username;
    this.user.password = this.userRegistration.password;
    console.log(this.user);
    this.auth
      .register(this.user)
      .then(() => {
        this.snackBar.open('You successfully signed up!', action, {
          duration: 2000
        });
      })
      .catch(error => {
        this.snackBar.open('Name or email is already taken!', action, {
          duration: 2000
        });
      });
  }
}
