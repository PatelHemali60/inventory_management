import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
declare var google: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public Role: boolean = false;
  public sidebarOpen = false;
  public RoleId: any = localStorage.getItem('roleID');
  public Login_Userid: any = localStorage.getItem('User_id');

  public Admin: any;
  public LoginUser_roleId: any = localStorage.getItem('Login_roleid');
  public User_id: any = localStorage.getItem('User');
  public Google_login: any = localStorage.getItem('Google_login');

  constructor(private router: Router) {
    this.Google_login = JSON.parse(this.Google_login);
    // console.log(this.Google_login.email, 'google login');
    if (this.LoginUser_roleId == this.User_id || this.Google_login !== null) {
      this.Role = true;
    } else {
      this.Role = false;
    }
  }

  ngOnInit(): void {}

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
    if (this.Login_Userid > 0 || this.Google_login !== null) {
      this.router.navigate(['login']);
      localStorage.clear();
    } else {
      google.accounts.id.disableAutoSelect();
      sessionStorage.removeItem('loggedInUser');
      sessionStorage.clear();
    }
  }
}
