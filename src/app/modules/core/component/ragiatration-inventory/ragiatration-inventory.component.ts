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
@Component({
  selector: 'app-ragiatration-inventory',
  templateUrl: './ragiatration-inventory.component.html',
  styleUrls: ['./ragiatration-inventory.component.scss'],
})
export class RagiatrationInventoryComponent {
  public Roles: any[] = [];
  public UserRoleId!: number;
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

  ngOnInit() {
    this.Roles = [];

    this.FirstName = new FormControl('', [Validators.required]);
    this.LastName = new FormControl('', [Validators.required]);
    this.EmailId = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.RoleId = new FormControl('');

    this.RagistrationForm = new FormGroup({
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmailId: this.EmailId,
      Password: this.Password,
      RoleId: this.RoleId,
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getallroleUser();
    this.isAddMode = !this.id;
  }

  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.RagistrationForm.controls;
  }

  //get rold id list
  private getallroleUser(): void {
    this.authService.getDepartments().subscribe({
      next: (data) => {
        let Reponse = data.Data;

        if (Reponse.length > 0) {
          //get id from user Name
          const userObject = Reponse.find(
            (item: any) => item.Name.toString().toLowerCase() == 'user'
          );

          this.UserRoleId = userObject?.Id;
        }
        // console.log(this.UserRoleId); // You can use this data
      },
      error: (e) => console.log(e),
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    debugger;
    if (this.RagistrationForm.invalid) {
      return;
    }

    // this.submitted = true;
    if (this.isAddMode && this.RagistrationForm.valid) {
      this.createUser();
    }
  }

  //creat new user
  public createUser(): void {
    this.RagistrationformValue = {
      FirstName: this.RagistrationForm.value.FirstName,
      LastName: this.RagistrationForm.value.LastName,
      EmailId: this.RagistrationForm.value.EmailId,
      Password: this.RagistrationForm.value.Password,
      RoleId: this.UserRoleId,
    };
    // console.log(this.RagistrationformValue, 'form value');

    this.authService.createUser(this.RagistrationformValue).subscribe({
      next: (res) => {
        this.toastr.success(res.SuccessMessage);
        this.navigateToList();
      },
      error: (e) => console.log(e),
    });
  }

  //route to users list
  public navigateToList(): void {
    this.router.navigate(['/login']);
  }
}
