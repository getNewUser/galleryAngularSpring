import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  username = 'Username..';
  password = 'Password..';


  onSubmit(f, action: string) {
    let user: IUser = f.value;
    this.username = user.username;
    this.password = user.password;
    this.auth
      .login(user.username, user.password)
      .then(() => {
        this.router.navigate(['']);
        this.jwtRefresh();
        let message = 'You successfully logged in!';
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      })
      .catch(() => {
        let message = 'Wrong credentials!';
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      });
  }
  jwtRefresh() {
    return new Promise(resolve => setTimeout(resolve, 900000)).then(() => {
      if (this.auth.loggedIn) {
        this.auth.logout();
        if (confirm('Do you want to continue being logged in?')) {
          this.auth.login(this.username, this.password);
          this.jwtRefresh();
        }
      }
    });
  }
}
