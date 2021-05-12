import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { TokenInterceptor, TOKEN_INTERCEPTOR_BLACKLIST } from './core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';
import { SharedModule } from '@app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { SuppliesListComponent } from './modules/supplies-list/supplies-list.component';
registerLocaleData(localePt)

export const BlackListToken: RegExp[] = [
  /(((https?):\/\/|www\.)viacep.com.br\/ws\/)/,
  /\/auth\/users\/login/,
  /\/auth\/revoke_token/,
  /\/refresh_token/
];


@NgModule({
  declarations: [
    AppComponent,
    SuppliesListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    {
      provide: TOKEN_INTERCEPTOR_BLACKLIST,
      useValue: BlackListToken
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline',
        floatLabel: 'auto'
      }
    },
    {provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
