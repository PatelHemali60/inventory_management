import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/service/user.service';
@Component({
  selector: 'app-ragiatration-inventory',
  templateUrl: './ragiatration-inventory.component.html',
  styleUrls: ['./ragiatration-inventory.component.scss'],
})
export class RagiatrationInventoryComponent {
  public Roles: any[] = [];
  public UserRoleId!: number;
  public ExistUser!: any[];
  public getUserRole: any;
  public errorMessage: any;
  public FirstName!: FormControl;
  public LastName!: FormControl;
  public EmailId!: FormControl;
  public RoleId!: FormControl;
  public Password!: FormControl;
  public roles: string[] = [];
  public form!: FormGroup;
  public RagistrationForm!: FormGroup;
  public RagistrationformValue: any;
  public submitted = false;
  public loading = false;
  private isAddMode: boolean;
  private id!: number;
  public email: any;
  public emailAvailability: boolean = false;

  public Google_Login: any = localStorage.getItem('Google_login');

  ngOnInit() {
    this.Roles = [];

    //get user_id form api
    this.authService.getUser_Id().subscribe({
      next: (data) => {
        let Reponse = data.Data;

        if (Reponse.length > 0) {
          const user = Reponse.find(
            (ele: any) => ele.Name.toString() == 'user'
          );
          this.UserRoleId = user.Id;
          this.RagistrationForm.get('RoleId')?.setValue(this.UserRoleId);
          // console.log(this.UserRoleId, 'formmmm');
          return user ? user.id : undefined;
          //get id from user Name
        }
      },
      error: (e: any) => console.log(e),
    });

    // console.log(this.Google_Login, 'google login data')
    //form ragistration
    this.FirstName = new FormControl('', [Validators.required]);
    this.LastName = new FormControl('', [Validators.required]);
    this.EmailId = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.Password = new FormControl('', [Validators.required]);
    this.RoleId = new FormControl('');

    this.RagistrationForm = new FormGroup({
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmailId: this.EmailId,
      Password: this.Password,
      RoleId: this.RoleId,
    });
    //set value inside form after login with google
    this.Google_Login = JSON.parse(this.Google_Login);
    // console.log(this.Google_Login, 'google login');
    if (this.Google_Login) {
      //set first name
      let f_name = this.Google_Login.given_name;
      this.RagistrationForm.get('FirstName')?.setValue(f_name);
      //set lastname
      let L_name = this.Google_Login.family_name;
      this.RagistrationForm.get('LastName')?.setValue(L_name);

      let email = this.Google_Login.email;
      this.RagistrationForm.get('EmailId')?.setValue(email);
    }

    // console.log(this.UserRoleId, 'role_id');

    // this.form.controls.controlname.value;
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public Userservice: UserService
  ) {
    this.isAddMode = !this.id;
  }

  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.RagistrationForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (!this.RagistrationForm.value) {
      return;
    }
    // this.submitted = true;
    if (this.isAddMode && this.RagistrationForm.value) {
      this.createUser();
    }
  }

  public createUser(): void {
    const registrationFormValue = {
      FirstName: this.RagistrationForm.value.FirstName,
      LastName: this.RagistrationForm.value.LastName,
      EmailId: this.RagistrationForm.value.EmailId,
      Password: this.RagistrationForm.value.Password,
      RoleId: this.UserRoleId,
    };

    // Check if EmailId is provided
    if (registrationFormValue.EmailId) {
      this.Userservice.getallUser().subscribe((data: any) => {
        let AllUser = data.Data;
        // console.log(data.Data, 'mail check ');
        // Use the Array.prototype.some() method to check if the email exists
        const emailExists = AllUser.some(
          (userData: any) => userData.EmailId === registrationFormValue.EmailId
        );

        if (emailExists) {
          this.toastr.error('Email Already exist !!!');
          this.router.navigate(['/login']);
          // this.RagistrationForm.reset();
          // You may want to show an error message to the user.
        } else {
          // Email doesn't exist; proceed to create the user
          this.authService.createUser(registrationFormValue).subscribe({
            next: (res: any) => {
              this.toastr.success('New User created !!!');
              this.router.navigate(['/login']);
            },
            error: (e) => console.log(e),
          });
        }
      });
    }
  }

  //route to users list
  public navigateToList(): void {
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
