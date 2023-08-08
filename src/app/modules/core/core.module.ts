import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInventoryComponent } from './component/login-inventory/login-inventory.component';
import { RagiatrationInventoryComponent } from './component/ragiatration-inventory/ragiatration-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginInventoryComponent,
    RagiatrationInventoryComponent,
    SideNavComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [SideNavComponent],
})
export class CoreModule {}
