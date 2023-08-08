import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InventoryComponent, AddProductComponent],
  imports: [CommonModule, InventoryRoutingModule, ReactiveFormsModule],
})
export class InventoryModule {}
