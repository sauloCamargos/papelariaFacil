import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers:[
    {provide:ErrorHandler, useClass: GlobalErrorHandler},
  ]
})
export class AdminModule { }
