import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f){
    let user: IUser = f.value;
    console.log(user);
    this.auth.login(user.username, user.password);
  }
 

  // login() {
  //   this.auth.login();
  // }

  logout() {
    this.auth.logout();
  }

  // isLoggedIn() {
  //   return this.auth.isLoggedIn();
  // }

}
