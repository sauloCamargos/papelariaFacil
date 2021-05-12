import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';
import { SharedModule } from '@app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ProductsProviderRoutingModule } from './products-provider-routing.module';
import { ProductsProviderComponent } from './products-provider.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManageComponent } from './product-manage/product-manage.component';



@NgModule({
  declarations: [
    ProductsProviderComponent,
    ListComponent,
    ManageComponent,
    ProductListComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProductsProviderRoutingModule
  ],
  providers:[
    {provide:ErrorHandler, useClass: GlobalErrorHandler},
  ]
})
export class ProductsProviderModule { }
