import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputControlComponent } from '../shared/component/input-control/input-control.component';

import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [BrandComponent, AddBrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class BrandModule {}
