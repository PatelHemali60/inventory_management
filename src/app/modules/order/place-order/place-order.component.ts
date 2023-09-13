import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Location } from '@angular/common';
import { PlaceOrderService } from '../service/place-order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  public orderForm: FormGroup;
  public submitted!: boolean;
  public placeOrderItemss!: any[];
  public PlaceOrdeData: any;
  addProductId!: number;
  AddQuantity!: number;
  AddPrice!: number;
  AddAmount!: number;

  // public id: number;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private placeOrder: PlaceOrderService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      OrderId: [0],
      OrderDate: [null],
      UserId: [0],
      UserName: [null],
      ProductId: [0],
      ProductName: [null],
      Quantity: [null],
      Price: [null],
      TotalAmount: [null],
      ShipperId: [0],
      OrderDetailId: [0],
      DeliverToName: [null],
      DeliverToMobile: [null],
      Address: [null],
      City: [null],
      State: [null],
      PinCode: [0],
      AddressType: [null],
      PaymentMode: [null],
      IsPaidAmount: [false],
      IsActive: [true],
      PlaceOrderItem: this.fb.array([this.createPlaceOrderItem()]),
      OrderFromCart: [false],
      Amount: [null],
    });
  }
  ngOnInit(): void {}

  get OrderItems(): FormArray {
    return this.orderForm.controls['PlaceOrderItem'] as FormArray;
  }

  //skills form group
  public createPlaceOrderItem(): FormGroup {
    return this.fb.group({
      ProductId: [0],
      Quantity: [0],
      Price: [0],
      Amount: [0],
    });
  }

  //add skill and delete skill methods
  public addSkills(): void {
    this.OrderItems.push(this.createPlaceOrderItem());
  }
  public deleteSkills(index: number): void {
    if (this.OrderItems.length != 1) {
      this.OrderItems.removeAt(index);
    }
  }

  // You can add or remove PlaceOrderItem items dynamically
  public addPlaceOrderItem() {
    const placeOrderItemArray = this.orderForm.get(
      'PlaceOrderItem'
    ) as FormArray;
    placeOrderItemArray.push(this.createPlaceOrderItem());
  }

  public removePlaceOrderItem(index: number) {
    const placeOrderItemArray = this.orderForm.get(
      'PlaceOrderItem'
    ) as FormArray;
    placeOrderItemArray.removeAt(index);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.orderForm.valid) {
      this.placeOrderitem();
    }
  }
  // public onProductChange(event: any) {
  //   this.addProductId = event.target.value;
  // }

  // public onQuntityChange(ele: any) {
  //   this.AddQuantity = ele.target.value;
  // }

  // public onPriceChange(ele: any) {
  //   this.AddPrice = ele.target.value;
  // }

  // public onAmountChange(ele: any) {
  //   this.AddAmount = ele.target.value;
  // }

  //Post data to db
  public placeOrderitem(): void {
    // console.log(this.orderForm.value, 'form');
    // this.PlaceOrderItem.push(this.placeOrderItemss);
    this.placeOrder
      .PlaceOrder(this.orderForm.value)
      .then((res: any) => {
        this.toaster.success('Place-Order sucessfully !!!');
        this.router.navigate(['product']);
      })
      .catch((error: any) => {});
  }

  public onCancel() {
    this.location.back();
  }
}
