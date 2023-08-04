import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RoleComponent,
    AddRoleComponent
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
