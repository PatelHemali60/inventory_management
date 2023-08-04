
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInventoryComponent } from './modules/core/component/login-inventory/login-inventory.component';
import { RagiatrationInventoryComponent } from './modules/core/component/ragiatration-inventory/ragiatration-inventory.component';
import { HomeComponent } from './modules/components/home/home.component';

const routes: Routes = [{
  path:'',redirectTo:'login',pathMatch:'full'
},
{path: 'login' , component:LoginInventoryComponent},
{path:'ragistration', component:RagiatrationInventoryComponent},
{ path: 'home', component:HomeComponent,
children: [

   { path: 'dashboard', loadChildren: () => import('./modules/dashbaord/dashbaord.module').then(m => m.DashbaordModule) },
   { path: 'roleMaster', loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule) },
]

},


 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
