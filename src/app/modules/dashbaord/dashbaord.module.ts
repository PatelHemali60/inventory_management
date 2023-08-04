import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbaordRoutingModule } from './dashbaord-routing.module';
import { DashbaordComponent } from './dashbaord.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    DashbaordComponent
  ],
  imports: [
    CommonModule,
    DashbaordRoutingModule,
    CoreModule
 ]
})
export class DashbaordModule { }
