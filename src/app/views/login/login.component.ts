import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  credentials: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  onSubmit(message: string, action: string) {
      let user: IUser = this.credentials.value;
      this.auth
        .login(user.username, user.password)
        .then(() => {
          this.router.navigate(['home']);
          message = 'You successfully logged in!';
          this.snackBar.open(message, action, { duration: 2000 });
        })
        .catch(() => {
          message = 'Wrong credentials!';
          this.snackBar.open(message, action, { duration: 2000 });
        });
    
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  logout() {
    this.auth.logout();
  }
}
