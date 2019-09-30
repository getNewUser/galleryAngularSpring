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
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  username = 'Username..';
  password = 'Password..';

  ngOnInit() {}

  onSubmit(f, action: string) {
    let user: IUser = f.value;
    this.auth
      .login(user.username, user.password)
      .then(() => {
        this.router.navigate(['']);
        let message = 'You successfully logged in!';
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      })
      .catch(() => {
        let message = 'Wrong credentials!';
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
      });
  }
}
