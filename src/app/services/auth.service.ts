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
  }

  login(usernameOrEmail: string, password: string) {
   return this.http
      .post<{ accessToken: string }>('http://localhost:8080/api/auth/signin', {
        usernameOrEmail,
        password
      })
      .toPromise()
      .then(res => {
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
    this.cookie.delete('Cookie');
  }

  public get loggedIn(): boolean {
    if(this.cookie.get('Cookie')){
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    // paima cookie ir .atob(base64) tada sprendzia kokia role
    let token = this.cookie.get('Cookie');

    let role = atob(token.split('.')[1]);
    role = role.substring(35,45);

    if(role === 'ROLE_ADMIN'){
      return true;
    }else {
      return false;
    }

  }
}
