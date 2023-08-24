import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbaordRoutingModule } from './dashbaord-routing.module';
import { DashbaordComponent } from './dashbaord.component';
import { CoreModule } from '../core/core.module';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { SalesSatsticComponent } from './components/sales-satstic/sales-satstic.component';
import { StockComponent } from './components/stock/stock.component';
import { TopsellingitemsComponent } from './components/topsellingitems/topsellingitems.component';

@NgModule({
  declarations: [DashbaordComponent, CardComponent, SalesSatsticComponent, StockComponent, TopsellingitemsComponent],
  imports: [CommonModule, DashbaordRoutingModule, CoreModule, NgChartsModule],
})
export class DashbaordModule {}
