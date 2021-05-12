import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';


@NgModule({
  declarations: [ProductsComponent, ListComponent, ManageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProductsRoutingModule
  ],
  providers:[
    {provide:ErrorHandler, useClass: GlobalErrorHandler},
  ]
})
export class ProductsModule { }
