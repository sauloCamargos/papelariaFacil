import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
