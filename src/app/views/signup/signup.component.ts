import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { IUserRegistration } from 'src/app/models/userregistration.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name = 'Name..';
  username = 'Username..';
  password = 'Password..';
  confirmPassword = 'Confirm Password..';
  email = '';

  user: IUser = {
    name: '',
    username: '',
    password: '',
    email: ''
  };
  userRegistration: IUserRegistration = {
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };


  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
  }

  

  onSubmit(form: NgForm, action: string) {
    if ((this.name === 'Name..') || (this.name === '') || (this.username === 'Username..') || (this.username === '')
    || (this.password === 'Password..') || (this.password === '') || (this.confirmPassword === 'Confirm Password..') || (this.confirmPassword === '')
    || (this.email === '')) {
      this.snackBar.open('You have to fill up all fields', action, {
        duration: 2000
      });
      return;
    }
    this.userRegistration = form.value;
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

  // onSubmit(action: string) {
  //   if (
  //     this.credentials.controls['password'].value !== this.credentials.controls['confirmPassword'].value
  //   ) {
  //     this.credentials.controls.password.setErrors({
  //       notMatched: true
  //     });
  //   }
  //   console.log(this.credentials.errors);
  //   if (this.credentials.invalid) {
  //     return;
  //   }
  //   this.userRegistration = this.credentials.value;
  //   this.user.email = this.userRegistration.email;
  //   this.user.name = this.userRegistration.name;
  //   this.user.username = this.userRegistration.username;
  //   this.user.password = this.userRegistration.password;
  //   console.log(this.user);
  //   this.auth
  //     .register(this.user)
  //     .then(() => {
  //       this.router.navigate(['home']);
  //       this.snackBar.open('You successfully signed up!', action, {
  //         duration: 2000
  //       });
  //     })
  //     .catch(error => {
  //       this.snackBar.open('Name or email is already taken!', action, {
  //         duration: 2000
  //       });
  //     });
  // }
}
