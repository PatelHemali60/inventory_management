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
import { ProductService } from '../../service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-productdetail',
  templateUrl: './view-productdetail.component.html',
  styleUrls: ['./view-productdetail.component.scss'],
})
export class ViewProductdetailComponent implements OnInit {
  // @ViewChild('imgElement') imgElement!: ElementRef;
  @Input() product: any;
  // @Input() item: any;
  public counterValue = 1;
  public inputnumber: number = 0;
  public ProductImage: any;
  public ID: any;
  public LoggedinUser: any;
  public Product: any;
  public Price!: any;
  quantity: number = 1; // Default quantity is 1
  baseProductPrice = 1199.0; // Initial product price
  inputNumber = 1; // Initial product quantity
  public grandTotal: any;

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
    private service: ProductService,
    private overlay: Overlay,
    private toaster: ToastrService,
    private sanitizer: DomSanitizer,
    @Inject('item') public item: any
  ) {
    this.ProductImage = this.sanitizer.bypassSecurityTrustResourceUrl(
      item.ImageUrl
    );
    this.Price = item.Price;
    // console.log(this.Price, 'price');
    localStorage.setItem('priceofproduct', item.Price);
    localStorage.setItem('Product_id', item.Id);
    this.logCounterValue();
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

  @Input()
  get Quntity() {
    return this.counterValue;
  }

  set Quntity(value) {
    this.counterValue = value;
  }

  decrement() {
    this.Quntity--;
    this.logCounterValue();
  }

  increment() {
    this.Quntity++;
    this.logCounterValue();
  }

  logCounterValue() {
    // console.log('Counter value:', this.Quntity);
    this.Price = localStorage.getItem('priceofproduct');
    this.grandTotal = this.Price * this.Quntity;
  }

  // {
  //   "Id": 0,
  //   "UserId": 0,
  //   "ProductId": 0,
  //   "Quantity": 0,
  //   "IsActive": true
  // }

  //add to cart
  public AddtoCart(): void {
    let RoleID = localStorage.getItem('roleID');
    let UserID = localStorage.getItem('userId');
    const ProductId = localStorage.getItem('Product_id');
    let item: any = {
      UserId: Number(UserID),
      ProductId: Number(ProductId),
      Quantity: this.Quntity,
      IsActive: false,
    };
    // console.log('add to cart', item);

    if (RoleID == null) {
      this.LoggedinUser = true;
      // location.reload();`
      this.router.navigate(['/login']);
    } else {
      this.LoggedinUser = false;
      this.service
        .AddtoCart(item)
        .then((res: any) => {
          this.router.navigate(['/AddtoCart']);
          this.toaster.success('Add product to cart sucessfully !!!');
        })
        .catch((error: any) => {});
    }
  }

  //  // Function to calculate the price based on quantity
}
