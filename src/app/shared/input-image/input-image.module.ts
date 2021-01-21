import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputImageComponent } from './input-image.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [InputImageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    InputImageComponent
  ]
})
export class InputImageModule { }
