import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ViewProductdetailComponent } from './component/view-productdetail/view-productdetail.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCardComponent,
    ViewProductdetailComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, OverlayModule],
  exports: [ProductComponent],
})
export class ProductModule {}
