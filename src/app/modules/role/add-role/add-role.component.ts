import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../service/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.RoleForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.roleService
        .getById(this.id)
        .subscribe((x) => this.RoleForm.patchValue(x));
    }
  }

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      IsActive: ['false', Validators.required],
    });
  }

  //Post data to db
  public addRole(): void {
    this.roleData = {
      Name: this.RoleForm.value.Name,
      Description: this.RoleForm.value.Description,
      IsActive: 'false',
    };

    console.log(this.roleData, 'dataaaaaaaa');
    this.roleService.AddRole(this.roleData).subscribe({
      next: () => {
        alert('Role added sucessfully !!!');
        this.navigateToList();
      },
      error: (e: any) => console.log(e),
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    console.log('hello there');
    if (this.isAddMode) {
      this.addRole();
    } else {
      this.updateUser();
    }
  }

  //Put data to db
  public updateUser(): void {
    this.roleService.updateRole(this.id, this.RoleForm.value).subscribe({
      next: () => {
        this.navigateToList();
      },
      error: (e: any) => console.log(e),
    });
  }

  public navigateToList(): void {
    this.router.navigate(['home/roleMaster']);
  }

  //Rest to form controls
  onRest() {
    this.RoleForm.reset();
  }

  onCancel() {
    this.cancel.emit();
  }
}
