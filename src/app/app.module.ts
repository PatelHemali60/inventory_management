import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './modules/components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgImageSliderModule } from 'ng-image-slider';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
  GoogleSigninButtonModule,
  GoogleSigninButtonDirective,
} from '@abacritt/angularx-social-login';
import { LoginInventoryComponent } from './modules/core/component/login-inventory/login-inventory.component';
import { authGuard } from './modules/core/service/auth.guard';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // NgxUsefulSwiperModule,
    NgImageSliderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '922947611289-vbj28uc7j6imjiaouud2s4qh3hquuifo.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
