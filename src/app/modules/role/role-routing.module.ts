import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';

const routes: Routes = [
  { path: '', component: RoleComponent },
  {
    path: 'form',
    component: AddRoleComponent,
  },
  { path: 'edit/:id', component: AddRoleComponent },
  {
    path: 'view/:id',
    component: ViewDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
