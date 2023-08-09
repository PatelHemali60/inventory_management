import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  {
    path: 'form',
    component: AddProductComponent,
  },
  { path: 'edit/:id', component: AddProductComponent },
  { path: 'view/:id', component: ProductViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
