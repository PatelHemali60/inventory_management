import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public shouldShowSidebar: boolean;

  public sidebarOpen = false;
  public ID: any;
  public Google_id: any;

  constructor() {
    this.shouldShowSidebar = true;

    this.ID = localStorage.getItem('Login_roleid');
    this.Google_id = localStorage.getItem('Google_login');

    if (this.ID !== null || this.Google_id !== null) {
      this.shouldShowSidebar = false;
    } else {
      this.shouldShowSidebar = true;
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
