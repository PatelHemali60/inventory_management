import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'placeOrder', pathMatch: 'full' },
  {
    path: 'placeOrder',
    component: PlaceOrderComponent,
  },
  { path: '', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
