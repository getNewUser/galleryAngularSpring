import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f, message, action){
    let user: IUser = f.value;
    this.auth.login(user.username, user.password).then( () => {
      this.router.navigate[''];
      message = "You successfully logged in!"
      this.snackBar.open(message, action, { duration: 2000});
    }).catch(error => {
      message = "Wrong credentials!"
      this.snackBar.open(message, action, { duration: 2000});
    })
  
  }


  logout() {
    this.auth.logout();
  }


}
