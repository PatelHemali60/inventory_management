import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class CategoryModule {}
