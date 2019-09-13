import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public href: string = "";

  constructor() {}

  ngOnInit() {
      this.getNameForHeader();
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
