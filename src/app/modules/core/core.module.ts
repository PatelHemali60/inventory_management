import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInventoryComponent } from './component/login-inventory/login-inventory.component';
import { RagiatrationInventoryComponent } from './component/ragiatration-inventory/ragiatration-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { authGuard } from './service/auth.guard';
@NgModule({
  declarations: [
    LoginInventoryComponent,
    RagiatrationInventoryComponent,
    SideNavComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleSigninButtonModule,
    RouterModule,
    FormsModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [SideNavComponent, HeaderComponent, LoginInventoryComponent],
})
export class CoreModule {}
