import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { ListComponent } from 'src/app/modules/schools/list/list.component';
import { ManageComponent } from 'src/app/modules/schools/manage/manage.component';
import { SuppliesListComponent } from 'src/app/modules/schools/supplies-list/supplies-list.component';
import { SuppliesManageComponent } from 'src/app/modules/schools/supplies-manage/supplies-manage.component';


@NgModule({
  declarations: [
    SchoolsComponent,
    ListComponent,
    ManageComponent,
    SuppliesListComponent,
    SuppliesManageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    SchoolsRoutingModule
  ]
})
export class SchoolsModule { }
