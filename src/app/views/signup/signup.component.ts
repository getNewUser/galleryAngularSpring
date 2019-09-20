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
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }


  private createForm(): void {
    this.credentials = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(12)] ],
      username: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(12)] ],
      email: ['', [Validators.required, Validators.email]],
      password: [ '', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      policy: [false, Validators.requiredTrue]
    },);
  }

  onSubmit(message: string, action: string) { 
    if ( this.credentials.controls['password'].value !== this.credentials.controls['confirmPassword'].value) {
      this.credentials.controls.password.setErrors({
        notMatched: true
      });
    }
    console.log( this.credentials.errors);
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
        this.router.navigate(['home']);
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
