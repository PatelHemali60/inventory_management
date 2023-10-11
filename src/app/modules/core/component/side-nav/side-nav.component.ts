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

  public Admin: any;
  public LoginUser_roleId: any = localStorage.getItem('Login_roleid');

  public User_id: any = localStorage.getItem('User');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(this.User_id, 'userid');
    // console.log(this.LoginUser_roleId, 'Roleid');

    if (this.LoginUser_roleId == this.User_id) {
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
