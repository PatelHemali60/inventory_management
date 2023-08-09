import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'form',
    component: AddUserComponent,
  },
  { path: 'edit/:id', component: AddUserComponent },
  // {
  //   path: 'view/:id',
  //   component:
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
