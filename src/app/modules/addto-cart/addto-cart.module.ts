import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtoCartRoutingModule } from './addto-cart-routing.module';
import { AddtoCartComponent } from './addto-cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddtoCartComponent],
  imports: [CommonModule, AddtoCartRoutingModule, FormsModule],
})
export class AddtoCartModule {}
