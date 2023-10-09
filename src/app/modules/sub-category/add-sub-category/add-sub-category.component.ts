import { BrandService } from './../../brand/service/brand.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SubCategoryService } from '../service/sub-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss'],
})
export class AddSubCategoryComponent {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public subCategoryForm: FormGroup;
  public subcategoryData!: any;
  private id: number;
  public isAddMode: boolean;
  public categoryList: any;
  editData: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.subCategoryForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getCategoryList();
    this.getSubcategoryList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.subCategoryForm.controls;
  }

  public getSubcategoryList(): void {
    this.subCategoryService.getsubCategory().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if (x.Id == this.id) {
              this.editData = x;
              this.subCategoryForm.patchValue({
                Id: x.Id,
                Name: x.Name,
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
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
      IsActive: [false],
      CategoryId: [2, Validators.required],
      CategoryName: [null],
    });
  }

  //get category list for bind dropdown
  public getCategoryList(): void {
    this.subCategoryService.getCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.subCategoryForm.invalid) {
      return;
    }

    if (this.subCategoryForm.valid) {
      this.submitted = true;

      if (this.isAddMode) {
        this.addSubcategory();
      } else {
        this.UpdateSubcategory();
      }
    }
  }
  // "Id": 0,
  // "Name": "string",
  // "Description": "string",
  // "IsActive": true,
  // "CategoryId": 0,
  // "CategoryName": "string"

  //subcategory
  public addSubcategory(): void {
    this.subcategoryData = {
      Name: this.subCategoryForm.value.Name,
      // Description: this.subCategoryForm.value.Description,
      CategoryId: this.subCategoryForm.value.CategoryId,
    };
    this.subCategoryService
      .AddsubCategory(this.subcategoryData)
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
        this.toastr.info(error.ErrorMessage);
      });
  }

  // //Put data to db

  //Put data to db
  public UpdateSubcategory(): void {
    this.subCategoryService
      .updateSubCategory(this.id, this.subCategoryForm.value)
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
    this.router.navigate(['subCategory']);
  }

  //Rest to form controls
  onRest() {
    this.subCategoryForm.reset();
  }

  onCancel() {
    this.router.navigate(['subCategory']);
  }
}
