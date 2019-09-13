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

    constructor(private http: HttpClient, private cookie: CookieService){
        // penktas punktas
    }

    login(usernameOrPassword:string, password:string) {
        return this.http.post<{access_token:  string}>('http://localhost:8080/api/auth/signin', {usernameOrPassword, password}).pipe(tap(res => {
        localStorage.setItem('access_token', res.access_token);
    })) 
    }
    register(user: IUser) {
        return this.http.post<{access_token: string}>('http://localhost:8080/api/auth/signup', {user}).pipe(tap(res => {
        this.login(user.email, user.password)
    }))
    }

    

    logout(): void {
        localStorage.removeItem('access_token');
      }

      public get loggedIn(): boolean{
        return localStorage.getItem('access_token') !==  null;
      }

    isAdmin(){
        // paima cookie ir .atob(base64) tada sprendzia kokia role
    }
}