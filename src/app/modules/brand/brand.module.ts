import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BrandComponent, AddBrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class BrandModule {}
