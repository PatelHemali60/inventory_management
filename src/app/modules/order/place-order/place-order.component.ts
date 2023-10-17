import { PlaceOrderService } from './../service/place-order.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Location } from '@angular/common';
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
  public UserDetail: any;
  public product: any;
  public FullName!: string;
  addProductId!: number;
  AddQuantity!: number;
  AddPrice!: number;
  AddAmount!: number;
  public User_id: any = localStorage.getItem('User_id');
  public ProductDetail: any = localStorage.getItem('product');

  // public id: number;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private placeOrder: PlaceOrderService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.orderForm = this.buildUsersForm();

    //api call for get user detail
    this.placeOrder.getUserDetail(this.User_id).subscribe((res: any) => {
      this.UserDetail = res.Data;
      this.FullName = this.UserDetail.FirstName.concat(
        ' ',
        this.UserDetail.LastName
      );
      this.orderForm.get('DeliverToName')?.setValue(this.FullName);
    });
    //set user_id to the Order_form
    this.orderForm.get('UserId')?.patchValue(this.User_id);
    //parse json_object to use as a object
    this.product = JSON.parse(this.ProductDetail);

    // console.log(this.product, 'productdetail');
    //set product_name to the
    this.orderForm.get('ProductName')?.setValue(this.product.Name);
    //set value of product_id
    let p_id = this.product.Id;
    //get quntity to store inside form
    let Qty = localStorage.getItem('Product_quantity');
    let product_price = localStorage.getItem('priceofproduct');
    let amount = localStorage.getItem('Total_Amount');

    //set value inside order_form using form array
    let OrderFormValue = this.fb.group({
      ProductId: [p_id],
      Quantity: [Qty],
      Price: [product_price],
      Amount: [amount],
    });
    this.OrderItems.push(OrderFormValue);
    //set value of total Amount inside form
    this.orderForm.get('TotalAmount')?.setValue(amount);
  }
  ngOnInit(): void {}

  public buildUsersForm(): FormGroup {
    return (this.orderForm = this.fb.group({
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
      PaymentMode: ['COD'],
      IsPaidAmount: [false],
      IsActive: [true],
      PlaceOrderItem: this.fb.array([]),
      OrderFromCart: [false],
      Amount: [null],
    }));
  }

  get OrderItems(): FormArray {
    return this.orderForm.controls['PlaceOrderItem'] as FormArray;
  }

  //skills form group
  // public createPlaceOrderItem(): FormGroup {
  //   return this.fb.group({
  //     ProductId: [0],
  //     Quantity: [0],
  //     Price: [0],
  //     Amount: [0],
  //   });

  //   // Get a reference to the FormGroup within the FormArray
  // }

  //add skill and delete skill methods
  public addSkills(): void {
    // this.OrderItems.push();
  }
  public deleteSkills(index: number): void {
    if (this.OrderItems.length != 1) {
      this.OrderItems.removeAt(index);
    }
  }

  // You can add or remove PlaceOrderItem items dynamically
  // public addPlaceOrderItem() {
  //   const placeOrderItemArray = this.orderForm.get(
  //     'PlaceOrderItem'
  //   ) as FormArray;
  //   placeOrderItemArray.push(this.createPlaceOrderItem());
  // }

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

  //Post data to db
  public placeOrderitem(): void {
    // console.log(this.orderForm.value, 'form');
    // this.PlaceOrderItem.push(this.placeOrderItemss);
    this.placeOrder
      .PlaceOrder(this.orderForm.value)
      .then((res: any) => {
        console.log(res.data, 'reponse place order');
        this.toaster.success(res.SuccessMessage);
        this.router.navigate(['product']);
        //Remove all product,Quntity,pric,TotalAmount
        this.removeItem();
      })
      .catch((error: any) => {});
  }

  public onCancel() {
    this.location.back();
  }

  //remove item from local storage
  public removeItem() {
    localStorage.removeItem('Total_Amount');
    localStorage.removeItem('product');
    localStorage.removeItem('priceofproduct');
    localStorage.removeItem('Product_quantity');
  }
}
