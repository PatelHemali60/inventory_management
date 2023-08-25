import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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

  constructor(private router: Router, private overlay: Overlay) {
    this.ID = localStorage.getItem('roleID');
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

  public onProductCardClick(ele: any) {
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

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
