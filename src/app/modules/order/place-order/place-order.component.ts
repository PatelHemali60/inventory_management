import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  submitted!: boolean;
  // public id: number;

  constructor(private fb: FormBuilder, private location: Location) {
    this.orderForm = this.fb.group({
      OrderId: [0],
      OrderDate: [''],
      UserId: [0],
      UserName: [''],
      ProductId: [0],
      ProductName: [''],
      Quantity: [0],
      Price: [0],
      TotalAmount: [0],
      ShipperId: [0],
      OrderDetailId: [0],
      DeliverToName: [''],
      DeliverToMobile: [''],
      Address: [''],
      City: [''],
      State: [''],
      PinCode: [0],
      AddressType: [''],
      PaymentMode: [''],
      IsPaidAmount: [true],
      IsActive: [true],
    });
  }
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }

  public onSubmit(): void {
    debugger;
    this.submitted = true;
    if (this.orderForm.valid) {
      this.placeOrder();
    } else {
      // this.updateUser();
    }
  }

  //Post data to db
  public placeOrder(): void {
    console.log(this.orderForm.value, 'form');
    // this.roleData = {
    //   Name: this.orderForm.value.Name,
    //   Description: this.orderForm.value.Description,
    // };
    // this.brandService
    //   .AddBrand(this.roleData)
    //   .then((res: any) => {
    //     this.toastr.success('Add Brand sucessfully !!!');
    //   })
    //   .catch((error: any) => {});
  }

  public onCancel() {
    this.location.back();
  }
}
