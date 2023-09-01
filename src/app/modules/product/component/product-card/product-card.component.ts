import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ViewProductdetailComponent } from '../view-productdetail/view-productdetail.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() Product!: any;
  @Input() backgroundColor!: string;

  public ID: any;
  public LoggedinUser: any;
  public quantity: number = 1;
  public currentRoutePath: any;

  constructor(private router: Router) {
    // this.ID = localStorage.getItem('roleID');
  }
  ngOnInit(): void {}

  //console.log(this.ID, 'id');

  public BuyNow() {
    if (this.ID == null) {
      this.LoggedinUser = true;
      this.router.navigate(['/login']);
    } else {
      this.LoggedinUser = false;
    }
  }

  // public onProductCardClick(ele: any) {
  //   console.log(ele.target.value, 'target value');

  //   const overlayRef = this.overlay.create({
  //     positionStrategy: this.overlay
  //       .position()
  //       .global()
  //       .top(`10px`)
  //       .centerHorizontally(),

  //     hasBackdrop: true,
  //   });

  //   const Formcomponent = new ComponentPortal(ViewProductdetailComponent);
  //   const componentRef = overlayRef.attach(Formcomponent);

  //   this.currentRoutePath = this.router.routerState.snapshot.url;
  //   console.log(this.currentRoutePath, 'routeeee');

  //   // overlayRef.backdropClick().subscribe(() => {
  //   //   overlayRef.dispose();
  //   // });

  //   let RoleID = localStorage.getItem('roleID');

  //   if (RoleID !== null) {
  //     const detachTimeout = 3000; // Detach after 5 seconds (adjust as needed)
  //     setTimeout(() => {
  //       overlayRef.detach();
  //       overlayRef.dispose();
  //     }, detachTimeout);
  //   } else {
  //     setTimeout(() => {
  //       overlayRef.detach();
  //       overlayRef.dispose();
  //     }, 1500);
  //   }

  //   overlayRef.backdropClick().subscribe(() => {
  //     overlayRef.detach();
  //     overlayRef.dispose();
  //   });
  // }
}
