import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInventoryComponent } from './modules/core/component/login-inventory/login-inventory.component';
import { RagiatrationInventoryComponent } from './modules/core/component/ragiatration-inventory/ragiatration-inventory.component';
import { HomeComponent } from './modules/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashbaord/dashbaord.module').then(
            (m) => m.DashbaordModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'roleMaster',
        loadChildren: () =>
          import('./modules/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'CategoryMaster',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'subCategory',
        loadChildren: () =>
          import('./modules/sub-category/sub-category.module').then(
            (m) => m.SubCategoryModule
          ),
      },
      {
        path: 'BrandMaster',
        loadChildren: () =>
          import('./modules/brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'discountMaster',
        loadChildren: () =>
          import('./modules/discount/discount.module').then(
            (m) => m.DiscountModule
          ),
      },
      {
        path: 'User',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'Inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
    ],
  },
  { path: 'login', component: LoginInventoryComponent },
  { path: 'ragistration', component: RagiatrationInventoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
