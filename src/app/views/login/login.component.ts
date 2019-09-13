import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


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
    console.log(f.value);
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
