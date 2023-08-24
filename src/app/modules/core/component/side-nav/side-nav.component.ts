import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public Role: boolean = false;
  public sidebarOpen = false;
  public RoleId: any = localStorage.getItem('roleID');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.RoleId == 16) {
      this.Role = true;
    } else {
      this.Role = false;
    }
  }

  public openSidebar() {
    if (!this.sidebarOpen) {
      this.sidebarOpen = true;
    }
  }

  closeSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
