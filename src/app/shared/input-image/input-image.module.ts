import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InputImageComponent } from './input-image.component';

export const BlackListToken: RegExp[] = [
  /(((https?):\/\/|www\.)viacep.com.br\/ws\/)/,
  /\/auth\/users\/login/,
  /\/auth\/revoke_token/,
  /\/refresh_token/
];


@NgModule({
  declarations: [InputImageComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    InputImageComponent
  ]
})
export class InputImageModule { }
