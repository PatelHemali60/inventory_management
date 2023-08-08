import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DiscountComponent, AddDiscountComponent],
  imports: [CommonModule, DiscountRoutingModule, ReactiveFormsModule],
})
export class DiscountModule {}
