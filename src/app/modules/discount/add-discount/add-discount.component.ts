import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DiscountService } from '../service/discount.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss'],
})
export class AddDiscountComponent implements OnInit {
  // {
  //   "Id": 1,
  //   "Name": "Discount 10%",
  //   "Description": "Discount 10%",
  //   "IsActive": true
  // },

  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public DiscountForm: FormGroup;
  public discountData!: any;
  private id: number;
  public isAddMode: boolean;
  public RoleList: any;
  public editData: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.DiscountForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getDiscountList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.DiscountForm.controls;
  }

  public getDiscountList(): void {
    this.discountService.getDiscountType().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if (x.Id == this.id) {
              this.editData = x;
              this.DiscountForm.patchValue({
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
      error: (e: any) => console.error(e),
    });
  }

  //

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      Description: [null],
      IsActive: [false],
    });
  }

  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.DiscountForm.invalid) {
      return;
    }

    if (this.DiscountForm.valid) {
      this.submitted = true;

      if (this.isAddMode) {
        this.addDiscount();
      } else {
        this.updateBrand();
      }
    }
  }

  //Post data to db
  public addDiscount(): void {
    this.discountData = {
      Name: this.DiscountForm.value.Name,
    };
    this.discountService
      .AddDiscount(this.discountData)
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

  //Put data to db
  public updateBrand(): void {
    this.discountService
      .updateDiscount(this.DiscountForm.value)
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
    this.router.navigate(['discountMaster']);
  }

  //Rest to form controls
  onRest() {
    this.DiscountForm.reset();
  }

  public onCancel() {
    this.location.back();
  }
}
