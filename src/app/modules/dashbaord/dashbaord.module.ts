import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbaordRoutingModule } from './dashbaord-routing.module';
import { DashbaordComponent } from './dashbaord.component';
import { CoreModule } from '../core/core.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashbaordComponent],
  imports: [CommonModule, DashbaordRoutingModule, CoreModule, NgChartsModule],
})
export class DashbaordModule {}
