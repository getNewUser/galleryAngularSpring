import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    basePath: 'localhost:8080';

    constructor(private http: HttpClient, private cookie: CookieService){
        // penktas punktas
    }

    login(): void {
        this.http.post(this.basePath + '/api/auth' + '/signin', {
            // body
        }).toPromise()
        .then(data => {
            this.cookie.set('Cookie-name','data', new Date);
        })
        .catch(err => console.log(err));
        // this.authState = true;
    }

    logout(): void {
        // delete cookie
        return this.cookie.delete('Cookie-name');
    }

    isLoggedIn(): boolean {
        return this.cookie.check('Cookie-name');
    }

    isAdmin(){
        // paima cookie ir .atob(base64) tada sprendzia kokia role
    }
}