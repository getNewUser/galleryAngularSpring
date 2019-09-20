import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public href: string = '';

  constructor(public auth: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
      this.getNameForHeader();
  }

  logout(message, action) {
    this.snackBar.open(message, action, { duration: 2000});
    this.router.navigate(['login']);
    this.auth.logout();
  }

  private getNameForHeader(): void {
    this.href = window.location.href
    this.href = this.href.substring(22);
  
    if(this.href.indexOf('/') > 0){
      this.href = this.href.substring(0, this.href.indexOf('/'));
    }
  }

}
