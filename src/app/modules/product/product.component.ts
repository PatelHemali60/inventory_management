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
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .top(`10px`)
        .centerHorizontally(),

      hasBackdrop: true,
    });

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
      const detachTimeout = 3000; // Detach after 5 seconds (adjust as needed)
      setTimeout(() => {
        overlayRef.detach();
        overlayRef.dispose();
      }, 5000);
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

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
