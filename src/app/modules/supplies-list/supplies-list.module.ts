import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesListRoutingModule } from './supplies-list-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [ListComponent, ManageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    SuppliesListRoutingModule
  ]
})
export class SuppliesListModule { }
