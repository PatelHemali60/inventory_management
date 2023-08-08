import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubCategoryComponent, AddSubCategoryComponent],
  imports: [CommonModule, SubCategoryRoutingModule, ReactiveFormsModule],
})
export class SubCategoryModule {}
