import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../role/service/role.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public UserForm!: FormGroup;
  public UserData!: any;
  public Role: any;
  public EditUserData: any;
  private id: number;
  public isAddMode: boolean;
  public editData: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.UserForm = this.buildUsersForm();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.userService.GetUserbyId(this.id).subscribe((ele: any) => {
        const editData = ele.Data;
        this.EditUserData = {
          Id: editData.Id,
          FirstName: editData.FirstName,
          LastName: editData.LastName,
          EmailId: editData.EmailId,
          Password: editData.Password,
          RoleId: parseInt(editData.RoleId),
          RoleName: editData.RoleName,
        };
        this.UserForm.patchValue(this.EditUserData);
      });
    }
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getRoleList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.UserForm.controls;
  }

  //get user list from db
  public getRoleList(): void {
    this.roleService.getProduct().subscribe({
      next: (data: any) => {
        this.Role = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  //

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      EmailId: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required],
      IsActive: [false],
      RoleId: [null],
      RoleName: [null],
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }

    if (this.UserForm.valid) {
      this.submitted = true;

      if (this.isAddMode) {
        this.addUser();
      } else {
        this.updateUser();
      }
    }
  }

  public addUser(): void {
    this.UserData = {
      FirstName: this.UserForm.value.FirstName,
      LastName: this.UserForm.value.LastName,
      EmailId: this.UserForm.value.EmailId,
      Password: this.UserForm.value.Password,
      IsActive: false,
      RoleId: parseInt(this.UserForm.value.RoleId),
      RoleName: this.UserForm.value.RoleName,
    };

    this.userService
      .AddUser(this.UserData)
      .then((res: any) => {
        if (res.SuccessMessage) {
          // It's a success, so display the success message
          this.toastr.success(res.SuccessMessage);
          this.navigateToList();
        } else {
          // It's an error, so display the error message
          this.toastr.error(res.ErrorMessage);
          if (!res.ErrorMessage) {
            this.router.navigate(['form']);
          }
        }
      })
      .catch((error) => {
        this.toastr.info(error.ErrorMessage);
      });
  }

  //Put data to db
  public updateUser(): void {
    this.userService
      .updateUSer(this.UserForm.value)
      .then((res: any) => {
        if (res.SuccessMessage) {
          // It's a success, so display the success message
          this.toastr.success(res.SuccessMessage);
          this.navigateToList();
        } else {
          // It's an error, so display the error message
          this.toastr.error(res.ErrorMessage);
          if (!res.ErrorMessage) {
            this.router.navigate(['form']);
          }
        }
      })
      .catch((error: any) => {
        this.toastr.error(error.ErrorMessage);
      });
  }

  public navigateToList(): void {
    this.router.navigate(['User']);
  }

  onCancel() {
    this.location.back();
  }
}
