import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath: 'localhost:8080';
  private cookieValue: string;

  constructor(private http: HttpClient, private cookie: CookieService) {
    // penktas punktas
  }

  login(usernameOrEmail: string, password: string) {
    return this.http
      .post<{ accessToken: string }>('http://localhost:8080/api/auth/signin', {
        usernameOrEmail,
        password
      }).toPromise()
      .then(res => {
          console.log(res);
        //   localStorage.setItem('access_token', res.accessToken);
        this.cookie.set('Cookie', res.accessToken);
        this.cookieValue = this.cookie.get('Cookie'); 
        });
  }

  async register(user: IUser) {
      const email = user.email;
      const username = user.username;
      const name = user.name;
      const password = user.password;
    return this.http
      .post<{ access_token: string }>('http://localhost:8080/api/auth/signup', {
        email,
        username,
        name,
        password
      })
      .toPromise()
      .then(() => this.login(email, password));
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  isAdmin() {
    // paima cookie ir .atob(base64) tada sprendzia kokia role
  }
}
