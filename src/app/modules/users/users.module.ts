import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [UsersComponent, ListComponent, ManageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
