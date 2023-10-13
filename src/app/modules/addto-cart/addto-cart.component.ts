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
  public Product: any;
  public Price!: any;
  public grandTotal: any;
  //counter value of increment and decrement
  public counterValue = 1;
  constructor(
    private toastr: ToastrService,
    private addtocartService: AddCartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProductfromcart();
  }

  public getAllProductfromcart() {
    let User_Id = localStorage.getItem('User_id');

    this.addtocartService
      .getAllProductformcartByUser_id(Number(User_Id))
      .then((res: any) => {
        this.CartProduct = res.Data;
        // this.toastr.success(res.SuccessMessage);
      })
      .catch((error: any) => {});
  }

  public RemoveProductfromCart(CartId: number) {
    this.addtocartService.RemovefromCart(CartId).subscribe((res: any) => {
      this.toastr.info('Product Remove from Cart !!!');
      this.router.navigate(['AddtoCart']);
    });
    this.reloadPage();
  }

  public reloadPage(): void {
    // Use JavaScript to reload the page
    window.location.reload();
  }

  public getTotalItemCount(): number {
    if (this.CartProduct) {
      return this.CartProduct.reduce(
        (total: any, product: any) => total + product.Quantity,
        0
      );
    } else {
      // Return a default value or handle the case when CartProduct is undefined.
      return 0;
    }
  }

  public calculateTotalPrice(): number {
    return this.CartProduct.reduce(
      (total: any, product: any) =>
        total + product.Quantity * product.ProductPrice,
      0
    );
  }

  public increment(index: number): void {
    if (this.CartProduct[index].Quantity < 10) {
      let incrementQuntity = this.CartProduct[index].Quantity++;
      // console.log(incrementQuntity, 'increment quntity');

      // this.addtocartService
      //   .AddtoCart(item)
      //   .then((res: any) => {
      //     this.router.navigate(['/AddtoCart']);
      //     this.toastr.success(res.SuccessMessage);
      //   })
      //   .catch((error: any) => {});
    }
  }

  public decrement(index: number): void {
    if (this.CartProduct[index].Quantity > 1) {
      this.CartProduct[index].Quantity--;
    }
  }

  public removeAll(): void {
    this.CartProduct = [];
  }
}
