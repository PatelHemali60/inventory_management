import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-inventory',
  templateUrl: './login-inventory.component.html',
  styleUrls: ['./login-inventory.component.scss']
})
export class LoginInventoryComponent implements OnInit{
  public errorMessage: any;
  public EmailId!: FormControl;
  public Password!: FormControl;
  public roles: string[] = [];
  public form!: FormGroup;
  public loginForm!: FormGroup;
  public submitted = false;
  public loading = false;
  public IsThirdPartyLogin :any = true;
  @Output() onSigninSuccess = new EventEmitter();
  @Input() clientId!: string;

  ngOnInit(){


    setTimeout(()=>{this.googleAuthenticate()},50);

    this.EmailId = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.IsThirdPartyLogin = new FormControl('false');

    this.loginForm = new FormGroup({
      EmailId: this.EmailId,
      Password: this.Password,
      IsThirdPartyLogin: this.IsThirdPartyLogin
    });

  }

  // private socialAuthService: SocialAuthService
constructor(private authService:AuthService, private router: Router){

}

  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

public onLogin(): void {
  this.submitted = true;

  let data = {
    EmailId: this.loginForm.value.EmailId,
    Password: this.loginForm.value.Password,
    IsThirdPartyLogin:false
  }
  this.authService.Login(data).subscribe({
    next:() => {
      alert("New User Creadted");
      this.router.navigate(['/home/dashboard'])
    },
    error:(e) => console.log(e)
  });

}

googleAuthenticate(){

}

public RouteRagistration(){
  this.router.navigate(['/ragistration'])
}

loginWithGoogle(): void {
  // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
}
// logOut(): void {
//   this.socialAuthService.signOut();
// }

}


