import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord.component';

const routes: Routes = [{ path: '', component: DashbaordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbaordRoutingModule { }
