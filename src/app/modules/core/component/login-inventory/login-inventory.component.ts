import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  @Output() onSigninSuccess = new EventEmitter();
  @Input() clientId!: string;

  ngOnInit() {
    setTimeout(() => {
      this.googleAuthenticate();
    }, 50);

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
    private toastr: ToastrService
  ) {}
  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public onLogin(): void {
    this.submitted = true;

    let data = {
      EmailId: this.loginForm.value.EmailId,
      Password: this.loginForm.value.Password,
      IsThirdPartyLogin: false,
    };

    this.authService.Login(data).subscribe((res: any) => {
      // console.log(res.Data, 'reponse');
      localStorage.setItem('userId', res.Data.Id);
      localStorage.setItem('roleID', res.Data.RoleId);
      let roleId = 16;
      let ID = res.Data.RoleId;
      this.toastr.success('Add User sucessfully !!!');
      localStorage.setItem('currentUser', ID);
      if (roleId == ID) {
        this.router.navigate(['/product']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  googleAuthenticate() {}

  public RouteRagistration() {
    this.router.navigate(['/ragistration']);
  }

  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }
}
