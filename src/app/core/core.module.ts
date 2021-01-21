import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    HttpClientModule
  ],
  exports:[
    HttpClientModule
  ],
  providers: []
})
export class CoreModule { }
