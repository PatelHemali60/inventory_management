import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInventoryComponent } from './modules/core/component/login-inventory/login-inventory.component';
import { RagiatrationInventoryComponent } from './modules/core/component/ragiatration-inventory/ragiatration-inventory.component';
import { HomeComponent } from './modules/components/home/home.component';
import { authGuard } from './modules/core/service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashbaord/dashbaord.module').then(
            (m) => m.DashbaordModule
          ),
        canActivate: [authGuard],
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
        canActivate: [authGuard],
      },
      {
        path: 'CategoryMaster',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'subCategory',
        loadChildren: () =>
          import('./modules/sub-category/sub-category.module').then(
            (m) => m.SubCategoryModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'BrandMaster',
        loadChildren: () =>
          import('./modules/brand/brand.module').then((m) => m.BrandModule),
        canActivate: [authGuard],
      },
      {
        path: 'discountMaster',
        loadChildren: () =>
          import('./modules/discount/discount.module').then(
            (m) => m.DiscountModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'User',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
        canActivate: [authGuard],
      },
      {
        path: 'Inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
        canActivate: [authGuard],
      },
      {
        path: 'AddtoCart',
        loadChildren: () =>
          import('./modules/addto-cart/addto-cart.module').then(
            (m) => m.AddtoCartModule
          ),
        canActivate: [authGuard],
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
