import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddCartService } from './add-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addto-cart',
  templateUrl: './addto-cart.component.html',
  styleUrls: ['./addto-cart.component.scss'],
})
export class AddtoCartComponent implements OnInit {
  public UserId!: number;
  public CartProduct!: any;

  constructor(
    private toastr: ToastrService,
    private addtocartService: AddCartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProductfromcart();
  }

  public getAllProductfromcart() {
    let userId = localStorage.getItem('userId');

    this.addtocartService
      .getAllProductformcart(Number(userId))
      .then((res: any) => {
        this.CartProduct = res.Data;
        console.log(res.Data, 'res of product in cart');
        this.toastr.success('get all product in cart sucessfully !!!');
      })
      .catch((error: any) => {});
  }

  public RemoveProductfromCart(CartId: number) {
    this.addtocartService.RemovefromCart(CartId).subscribe((res: any) => {
      this.toastr.info('remove Product from cart !!!');
    });
  }

  // @Input()
  // get Quntity() {
  //   return this.counterValue;
  // }

  // set Quntity(value) {
  //   this.counterValue = value;
  // }

  // decrement() {
  //   this.Quntity--;
  //   this.logCounterValue();
  // }

  // increment() {
  //   this.Quntity++;
  //   this.logCounterValue();
  // }

  // logCounterValue() {
  //   // console.log('Counter value:', this.Quntity);
  //   this.Price = localStorage.getItem('priceofproduct');
  //   this.grandTotal = this.Price * this.Quntity;
  // }
}
