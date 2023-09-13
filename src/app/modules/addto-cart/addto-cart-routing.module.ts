import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtoCartComponent } from './addto-cart.component';

const routes: Routes = [{ path: '', component: AddtoCartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtoCartRoutingModule {}
