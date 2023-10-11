import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public shouldShowSidebar: boolean = false;

  public sidebarOpen = false;
  public ID: any;

  constructor() {
    this.ID = localStorage.getItem('Login_roleid');

    if (this.ID == null) {
      this.shouldShowSidebar = true;
    } else {
      this.shouldShowSidebar = false;
    }
  }

  public openSidebar() {
    if (!this.sidebarOpen) {
      this.sidebarOpen = true;
    }
  }

  ngOnInit(): void {}

  // if(){

  // }
}
