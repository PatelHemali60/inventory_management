import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './service/product.service';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ViewProductdetailComponent } from './component/view-productdetail/view-productdetail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public Products!: any;
  public currentRoutePath: any;

  constructor(
    private productService: ProductService,
    private overlay: Overlay,
    private router: Router
  ) {
    this.GetallProductList();
  }

  ngOnInit(): void {}

  //get department list from db
  private GetallProductList(): void {
    this.productService.getallProduct().subscribe({
      next: (data: any) => {
        this.Products = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  public onProductCardClick(item: any) {
    console.log(item, 'target value');

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .top(`10px`)
        .centerHorizontally(),

      hasBackdrop: true,
    });

    const Formcomponent = new ComponentPortal(ViewProductdetailComponent);
    const componentRef = overlayRef.attach(Formcomponent);

    // Pass the 'item' parameter to the ViewProductdetailComponent instance
    // const instance = componentRef.instance;
    // instance.item = item; // Assuming 'ViewProductdetailComponent' has an 'item' input

    this.currentRoutePath = this.router.routerState.snapshot.url;

    // overlayRef.backdropClick().subscribe(() => {
    //   overlayRef.dispose();
    // });

    let RoleID = localStorage.getItem('roleID');

    if (RoleID !== null) {
      const detachTimeout = 4000; // Detach after 5 seconds (adjust as needed)
      setTimeout(() => {
        overlayRef.detach();
        overlayRef.dispose();
      }, detachTimeout);
    } else {
      setTimeout(() => {
        overlayRef.detach();
        overlayRef.dispose();
      }, 1500);
    }

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
    });
  }

  // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ViewProductdetailComponent);
  // const componentRef = componentFactory.create(this.injector);

  // const componentInstance = componentRef.instance as ViewProductdetailComponent;
  // componentInstance.itemData = item; // Assuming 'itemData' is an input property in ViewProductdetailComponent

  // overlayRef.attach(componentRef);
}
