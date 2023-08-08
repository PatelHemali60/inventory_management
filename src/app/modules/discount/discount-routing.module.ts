import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';

const routes: Routes = [
  { path: '', component: DiscountComponent },
  {
    path: 'form',
    component: AddDiscountComponent,
  },
  { path: 'edit/:id', component: AddDiscountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRoutingModule {}
