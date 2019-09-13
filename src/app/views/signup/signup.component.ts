import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { IUserRegistration } from 'src/app/models/userregistration.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  credentials: FormGroup;
  user: IUser = {
    name: '',
    username: '',
    password: '',
    email: ''
  };
  userRegistration: IUserRegistration;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  model: any = {};
  onSubmit(userForm) {
    if (userForm.form.valid) {
      alert('Form submitted sucessfully');
      this.userRegistration = userForm.value;
      this.user.email = this.userRegistration.email;
      this.user.name = this.userRegistration.name;
      this.user.username = this.userRegistration.username;
      this.user.password = this.userRegistration.password;
      console.log(this.user);
      this.auth.register(this.user);
    }
  }
}
