import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './service/product.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ViewProductdetailComponent } from './component/view-productdetail/view-productdetail.component';
// import { SwiperOptions } from 'swiper';
import { InjectionToken } from '@angular/core';
export const ITEM_DATA = new InjectionToken<any>('item_data');
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild('nav') slider!: NgImageSliderComponent;

  //export data using injection token

  public imageObject!: any;
  //   {
  //     image: '../../../assets/assets/images/images/Google.png',
  //     thumbImage: '../../../assets/assets/images/images/mobile-1.jpg',
  //     alt: 'google',
  //     title: 'title of image',
  //   },
  //   {
  //     image: '../../../assets/assets/images/images/man-thisrt.jpg', // Support base64 image
  //     thumbImage: '../../../assets/assets/images/images/man-thisrt.jpg', // Support base64 image
  //     title: 'Man`s t-shirt', //Optional: You can use this key if want to show image with title
  //     alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  //     order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  //   },
  // ];
  public Products!: any;
  public currentRoutePath: any;
  public injector: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    this.GetallProductList();
  }

  ngOnInit(): void {}

  //get department list from db
  private GetallProductList(): void {
    this.productService.getallProduct().subscribe({
      next: (data: any) => {
        this.Products = data.Data;
        // this.imageObject = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  public onProductCardClick(item: any) {
    // console.log(item, 'target value');

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .top(`10px`)
        .centerHorizontally(),

      hasBackdrop: true,
    });

    // const overlayRef: OverlayRef = this.overlay.create(overlayConfig);

    // Create a factory for the ViewProductdetailComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ViewProductdetailComponent
    );

    // Create the component portal
    const componentPortal = new ComponentPortal(
      ViewProductdetailComponent,
      null,
      this.createInjectorWithItem(item)
    );

    // Attach the portal to the overlay
    overlayRef.attach(componentPortal);

    // Subscribe to the backdrop click event to close the overlay when clicked outside
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach(); // Close the overlay when clicking outside
    });

    this.currentRoutePath = this.router.routerState.snapshot.url;

    // overlayRef.backdropClick().subscribe(() => {
    //   overlayRef.dispose();
    // });

    let RoleID = localStorage.getItem('roleID');
    if (RoleID !== null) {
      // RoleID is not null, open the CDK overlay here
      const detachTimeout = 10000; // Detach after 5 seconds (adjust as needed)
      setTimeout(() => {
        overlayRef.detach();
        overlayRef.dispose();
      }, detachTimeout);
    } else {
      setTimeout(() => {
        overlayRef.detach();
        overlayRef.dispose();
      }, 0);
      // RoleID is null, redirect to the login page
      this.router.navigate(['/login']);
    }

    // if (RoleID !== null) {
    //   const detachTimeout = 4000; // Detach after 5 seconds (adjust as needed)
    //   setTimeout(() => {
    //     overlayRef.detach();
    //     overlayRef.dispose();
    //   }, detachTimeout);
    // } else {
    //   setTimeout(() => {
    //     overlayRef.detach();
    //     overlayRef.dispose();
    //   }, 200);
    // }

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
    });
  }

  private createInjectorWithItem(item: any): Injector {
    return Injector.create({
      providers: [{ provide: 'item', useValue: item }],
      parent: this.injector,
    });
  }
  // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ViewProductdetailComponent);
  // const componentRef = componentFactory.create(this.injector);

  // const componentInstance = componentRef.instance as ViewProductdetailComponent;
  // componentInstance.itemData = item; // Assuming 'itemData' is an input property in ViewProductdetailComponent

  // overlayRef.attach(componentRef);

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
