import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewDetailComponent } from './view-detail/view-detail.component';


@NgModule({
  declarations: [
    RoleComponent,
    AddRoleComponent,
    ViewDetailComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class RoleModule { }
