import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
