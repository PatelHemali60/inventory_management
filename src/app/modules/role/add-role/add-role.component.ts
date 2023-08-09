import { Role } from './../model/role.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../service/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public RoleForm: FormGroup;
  public roleData!: any;
  private id: number;
  private isAddMode: boolean;
  private RoleList: any;
  public editData: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.RoleForm = this.buildUsersForm();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getRoleList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.RoleForm.controls;
  }

  public getRoleList(): void {
    this.roleService.getProduct().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if (x.Id == this.id) {
              this.editData = x;
              this.RoleForm.patchValue({
                Id: x.Id,
                Name: x.Name,
                Description: x.Description,
                IsActive: false,
                // Update other form controls as needed
              });
            }
          });
        }
      },
      error: (e) => console.error(e),
    });
  }

  //

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      IsActive: [false, Validators.required],
    });
  }

  //on Form submit
  public onSubmit(): void {
    //flag for form valid
    this.submitted = true;
    if (this.isAddMode && this.RoleForm.valid) {
      this.addRole();
    } else {
      this.updateRole();
    }
  }

  //Post data to db
  public addRole(): void {
    this.roleData = {
      Name: this.RoleForm.value.Name,
      Description: this.RoleForm.value.Description,
    };
    this.roleService
      .AddRole(this.roleData)
      .then((res: any) => {
        this.toastr.success('Add Role sucessfully !!!');
        this.navigateToList();
      })
      .catch((error) => {});
  }

  //Put data to db
  public updateRole(): void {
    this.roleService
      .updateRole(this.RoleForm.value)
      .then((res: any) => {
        this.navigateToList();
        this.toastr.success('Role Updated sucessfully !!!');
      })
      .catch((error: any) => {});
  }

  public navigateToList(): void {
    this.router.navigate(['home/roleMaster']);
  }

  //Rest to form controls
  onRest() {
    this.RoleForm.reset();
  }

  onCancel() {
    this.location.back();
  }
}
