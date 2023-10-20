import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login-inventory',
  templateUrl: './login-inventory.component.html',
  styleUrls: ['./login-inventory.component.scss'],
})
export class LoginInventoryComponent implements OnInit {
  public errorMessage: any;
  public EmailId!: FormControl;
  public Password!: FormControl;
  public roles: string[] = [];
  public form!: FormGroup;
  public loginForm!: FormGroup;
  public submitted = false;
  public loading = false;
  public IsThirdPartyLogin: any = true;
  public Role: any;

  public Admin_id!: any;
  public User_id!: any;

  public username: string = '';
  public password: string = '';

  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  @Output() onSigninSuccess = new EventEmitter();
  @Input() clientId!: string;

  ngOnInit() {
    // setTimeout(() => {
    //   this.googleAuthenticate();
    // }, 50);
    // this.googleAuthService.initialize();

    this.EmailId = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.IsThirdPartyLogin = new FormControl('false');

    this.loginForm = new FormGroup({
      EmailId: this.EmailId,
      Password: this.Password,
      IsThirdPartyLogin: this.IsThirdPartyLogin,
    });
  }

  // private socialAuthService: SocialAuthService
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
    this.getallRoledetail();

    // Clear everything from sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  }
  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public getallRoledetail() {
    this.authService.getAlluserRole().subscribe((res: any) => {
      let response = res.Data;

      response.forEach((ele: any) => {
        if (ele.Name.toLowerCase() == 'admin') {
          this.Admin_id = ele.Id;
        } else if (ele.Name.toLowerCase() == 'user') {
          this.User_id = ele.Id;
        }
      });
      localStorage.setItem('Admin', this.Admin_id);
      localStorage.setItem('User', this.User_id);
    });
  }

  // public onLogin(): void {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   let data = {
  //     EmailId: this.loginForm.value.EmailId,
  //     Password: this.loginForm.value.Password,
  //     IsThirdPartyLogin: false,
  //   };

  //   this.authService.Login(data).subscribe((res: any) => {
  //     console.log('login user detail', res.Data);

  //     localStorage.setItem('Login_roleid', res.Data.RoleId);
  //     localStorage.setItem('User_id', res.Data!.Id);
  //     // localStorage.setItem('roleID_User', res.Data.RoleId);

  //     // console.log(res.Data.RoleId, 'login user roleid');

  //     let roleId = this.User_id;
  //     let Rolewise_id = res.Data.RoleId;
  //     this.toastr.success(res.SuccessMessage);
  //     localStorage.setItem('currentUser', Rolewise_id);
  //     if (roleId == Rolewise_id) {
  //       this.router.navigate(['/product']);
  //     } else {
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }

  public onLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let data = {
      EmailId: this.loginForm.value.EmailId,
      Password: this.loginForm.value.Password,
      IsThirdPartyLogin: false,
    };

    this.authService.Login(data).subscribe((res: any) => {
      if (res && res.Data && res.Data.RoleId && res.Data.Id !== null) {
        localStorage.setItem('Login_roleid', res.Data.RoleId);
        localStorage.setItem('User_id', res.Data.Id);

        let roleId = this.User_id;
        let Rolewise_id = res.Data.RoleId;

        this.toastr.success(res.SuccessMessage);
        localStorage.setItem('currentUser', Rolewise_id);

        if (roleId == Rolewise_id) {
          this.router.navigate(['/product']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  public RouteRagistration() {
    this.router.navigate(['/ragistration']);
  }

  // public loginWithGoogle(): void {
  //   this.isLoggedin == true;
  //   this.socialAuthService.authState.subscribe((user) => {
  //     this.socialUser = user;
  //     this.isLoggedin = user != null;
  //     console.log(this.socialUser);
  //   });
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  public logOut(): void {
    this.socialAuthService.signOut();
  }

  // public handleSignIn(res: any) {
  //   console.log(res, 'google login');
  //   // Handle successful sign-in here
  //   console.log('Successfully signed in', res);
  //   this.router.navigate(['/product']);
  // }

  onSubmit() {
    console.log(`Username: ${this.username}, Password: ${this.password}`);
    this.router.navigate([]);
  }
}
