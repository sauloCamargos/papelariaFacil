import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { GlobalErrorHandler } from '@app/core/services/global-error-handler';
import { SharedModule } from '@app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { SuppliesListComponent } from './supplies-list/supplies-list.component';
import { SuppliesManageComponent } from './supplies-manage/supplies-manage.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    ManageComponent,
    SuppliesListComponent,
    SuppliesManageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    UsersRoutingModule
  ],
  providers:[
    {provide:ErrorHandler, useClass: GlobalErrorHandler},
  ]
})
export class UsersModule { }
