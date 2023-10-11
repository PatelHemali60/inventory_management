import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BrandService } from '../service/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../category/service/category.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public brandForm!: FormGroup;
  public BrandData!: any;
  private id: number;
  public isAddMode: boolean;
  public SubcategoryList: any;
  editData: any;
  public submitted = false;

  inputValue!: any; // Initialize with an empty string

  public onDynamicInputValueChange(value: string) {
    this.inputValue = value;
    console.log('Input value changed to:', value);
  }

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location,
    private categoryService: CategoryService
  ) {
    this.brandForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getbrandList();
    this.getcategoryList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }

  //category list
  public getcategoryList(): void {
    this.brandService.getsubCategory().subscribe({
      next: (data: any) => {
        this.SubcategoryList = data.Data;
      },
      error: (e: any) => console.log(e),
    });
  }

  public getbrandList(): void {
    this.brandService.getBrand().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if (x.Id == this.id) {
              this.editData = x;
              this.brandForm.patchValue({
                Id: x.Id,
                Name: x.Name,
                SubCategoryId: x.SubCategoryId,
                // Update other form controls as needed
              });
            }
          });
        }
      },
      error: (e) => console.error(e),
    });
  }

  // {
  //   "Id": 0,
  //   "Name": "string",
  //   "Description": "string",
  //   "SubCategoryId": 0,
  //   "IsActive": true
  // }

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      Description: [null],
      SubCategoryId: [6, Validators.required],
      IsActive: [false],
    });
  }

  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.brandForm.invalid) {
      return;
    }

    if (this.brandForm.valid) {
      this.submitted = true;

      if (this.isAddMode) {
        this.addBrand();
      } else {
        this.updateBrand();
      }
    }
  }
  //Post data to db
  //Post data to db
  public addBrand(): void {
    this.BrandData = {
      Name: this.brandForm.value.Name,
      SubCategoryId: this.brandForm.value.SubCategoryId,
    };
    console.log(this.BrandData, 'brand with category');
    this.brandService
      .AddBrand(this.BrandData)
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
  public updateBrand(): void {
    this.brandService
      .updateBrand(this.brandForm.value)
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
    this.router.navigate(['BrandMaster']);
  }

  //Rest to form controls
  onRest() {
    this.brandForm.reset();
  }

  onCancel() {
    this.location.back();
  }
}
