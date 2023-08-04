import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: RoleComponent },
  {
    path: 'form',
    component: AddRoleComponent,
  },
  { path: 'edit/:id', component: AddRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
