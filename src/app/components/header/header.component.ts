import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public href: string = "";

  constructor(public auth: AuthService,
              private snackBar: MatSnackBar,) {}

  ngOnInit() {
      this.getNameForHeader();
      console.log(this.auth.loggedIn);
  }

  logout(message, action) {
    this.snackBar.open(message, action, { duration: 2000});
    this.auth.logout();
  }

  private getNameForHeader(): void {
    this.href = window.location.href
    this.href = this.href.substring(22);
  
    if(this.href.indexOf("/") > 0){
      console.log(this.href.indexOf("/"))
      this.href = this.href.substring(0, this.href.indexOf("/"));
    }
  }

}
