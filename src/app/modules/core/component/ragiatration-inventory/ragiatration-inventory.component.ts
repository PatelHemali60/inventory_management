import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-ragiatration-inventory',
  templateUrl: './ragiatration-inventory.component.html',
  styleUrls: ['./ragiatration-inventory.component.scss'],
})
export class RagiatrationInventoryComponent {
  public Roles: any[] = [];
  public errorMessage: any;
  public FirstName!: FormControl;
  public LastName!: FormControl;
  public EmailId!: FormControl;
  public RoleId!: FormControl;
  public Password!: FormControl;
  public roles: string[] = [];
  public form!: FormGroup;
  public RagistrationForm!: FormGroup;
  public submitted = false;
  public loading = false;
  private isAddMode: boolean;
  private id!: number;

  ngOnInit() {
    setTimeout(() => {
      this.googleAuthenticate();
    }, 50);
    this.Roles = [];

    this.FirstName = new FormControl('', [Validators.required]);
    this.LastName = new FormControl('', [Validators.required]);
    this.EmailId = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.RoleId = new FormControl('16', [Validators.required]);

    this.RagistrationForm = new FormGroup({
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmailId: this.EmailId,
      Password: this.Password,
      RoleId: this.RoleId,
    });
  }

  // "Id": 0,
  // "FirstName": "string",
  // "LastName": "string",
  // "EmailId": "string",
  // "Password": "string",
  // "RoleId": 0

  // "Data": [
  //   {
  //     "Id": 1,
  //     "Name": "Admin",
  //     "Description": "Admin",
  //     "IsActive": true
  //   },

  constructor(private authService: AuthService, private router: Router) {
    this.getDepartmentList();
    this.isAddMode = !this.id;
  }

  //Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.RagistrationForm.controls;
  }

  public onSubmit(): void {
    // this.submitted = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      // this.updateUser();
    }
  }

  //get rold id list
  private getDepartmentList(): void {
    this.authService.getDepartments().subscribe({
      next: (data) => {
        this.Roles = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //creat user
  //Post data to db
  public createUser(): void {
    this.authService.createUser(this.RagistrationForm.value).subscribe({
      next: () => {
        alert('New User Creadted');

        this.navigateToList();
      },
      error: (e) => console.log(e),
    });
  }

  //route to users list
  public navigateToList(): void {
    this.router.navigate(['/login']);
  }

  googleAuthenticate() {}
}
