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
  public isAddMode: boolean;
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
      Description: [null],
      IsActive: ['false'],
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    if (this.categoryForm.valid) {
      this.submitted = true;

      if (this.isAddMode) {
        this.addCategory();
      } else {
        this.updateCategory();
      }
    }
  }

  //Post data to db
  public addCategory(): void {
    this.roleData = {
      Name: this.categoryForm.value.Name,
    };
    this.categoryService
      .AddCategory(this.roleData)
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
  public updateCategory(): void {
    this.categoryService
      .updateCategory(this.categoryForm.value)
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
    this.router.navigate(['CategoryMaster']);
  }

  //Rest to form controls
  onRest() {
    this.categoryForm.reset();
  }

  onCancel() {
    this.router.navigate(['CategoryMaster']);
  }
}
