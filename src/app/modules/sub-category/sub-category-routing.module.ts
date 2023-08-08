import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';

const routes: Routes = [
  { path: '', component: SubCategoryComponent },
  {
    path: 'form',
    component: AddSubCategoryComponent,
  },
  { path: 'edit/:id', component: AddSubCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoryRoutingModule {}
