import { Overlay } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ITEM_DATA } from '../../product.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-productdetail',
  templateUrl: './view-productdetail.component.html',
  styleUrls: ['./view-productdetail.component.scss'],
})
export class ViewProductdetailComponent implements OnInit {
  // @ViewChild('imgElement') imgElement!: ElementRef;

  // @Input() item: any;
  @Input() product: any;
  public inputnumber: number = 0;
  public ProductImage: any;
  public ID: any;
  public LoggedinUser: any;
  public Product: any;
  quantity: number = 1; // Default quantity is 1
  baseProductPrice = 1199.0; // Initial product price
  inputNumber = 1; // Initial product quantity
  grandTotal = this.calculateGrandTotal();
  Price!: number;
  dataUrl!: string;

  packagesArray = [
    {
      tickettype: 'general',
      price: 1199,
      limit: 4,
      quantity: 0,
    },
  ];
  // item: any;

  constructor(
    private router: Router,
    private overlay: Overlay,
    private sanitizer: DomSanitizer,
    @Inject('item') public item: any
  ) {
    this.ProductImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      item.ImageUrl
    );
    // console.log(item.ImageUrl, 'itemmm');
    // this.ProductImage = this.sanitizer.bypassSecurityTrustUrl(item.ImageUrl);
    // console.log(this.ProductImage, 'image');
    // Replace 'item.ImageUrl' with the actual local file path
  }

  ngOnInit(): void {}
  public BuyNow() {
    let RoleID = localStorage.getItem('roleID');
    if (RoleID == null) {
      this.LoggedinUser = true;
      // location.reload();
      this.router.navigate(['/login']);
    } else {
      this.LoggedinUser = false;

      this.router.navigate(['/order']);
    }
  }

  /* this code is for increment value of */
  public calculatePrice(): number {
    const originalPrice = this.Product.originalPrice; // Replace with the actual property name
    const discount = this.Product.discount; // Replace with the actual property name
    return (originalPrice - (originalPrice * discount) / 100) * this.quantity;
  }

  plus() {
    this.inputnumber = this.inputnumber + 1;
  }
  minus() {
    if (this.inputnumber != 0) {
      this.inputnumber = this.inputnumber - 1;
    }
  }

  updateGrandTotal() {
    this.grandTotal = this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    return this.baseProductPrice * this.inputNumber;
  }

  increase_quantity(temp_package: any) {
    if (temp_package.limit == temp_package.quantity) {
      return alert("Can't add more");
    } else {
      temp_package.quantity++;
      this.baseProductPrice += temp_package.price;
    }
  }

  decrease_quantity(temp_package: any) {
    if (temp_package.quantity == 0) {
      return alert("can't be in minus");
    }
    temp_package.quantity--;
    this.baseProductPrice -= temp_package.price;
  }
  // countPrice() {
  //   this.Price = 0;
  //   for (let p of this.packagesArray) {
  //     this.baseProductPrice += this.Price * quantity;
  //   }
  // }

  // Method to handle price changes (e.g., from an API)
  updatePrice(newPrice: number) {
    this.baseProductPrice = newPrice;
    this.updateGrandTotal();
  }
}
