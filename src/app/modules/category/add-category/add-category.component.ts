import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public categoryForm: FormGroup;
  public roleData!: any;
  private id: number;
  private isAddMode: boolean;
  private categoryList: any;
  editData: any;
  public submitted: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getcategoryList();
  }

  //get control form category form
  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.categoryForm.controls;
  }

  public getcategoryList(): void {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if (x.Id == this.id) {
              this.editData = x;
              this.categoryForm.patchValue({
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

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      IsActive: ['false', Validators.required],
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.isAddMode && this.categoryForm.valid) {
      this.addRole();
    } else {
      this.updateUser();
    }
  }

  //Post data to db
  public addRole(): void {
    this.roleData = {
      Name: this.categoryForm.value.Name,
      Description: this.categoryForm.value.Description,
    };

    this.categoryService
      .AddCategory(this.roleData)
      .then((res: any) => {
        this.navigateToList();
        this.toastr.success('Add Category sucessfully !!!');
      })
      .catch((error) => {});
  }

  //Put data to db
  public updateUser(): void {
    this.categoryService
      .updateCategory(this.id, this.categoryForm.value)
      .subscribe({
        next: () => {
          this.navigateToList();
        },
        error: (e: any) => console.log(e),
      });
  }

  public navigateToList(): void {
    this.router.navigate(['home/CategoryMaster']);
  }

  //Rest to form controls
  onRest() {
    this.categoryForm.reset();
  }

  onCancel() {
    this.cancel.emit();
  }
}
