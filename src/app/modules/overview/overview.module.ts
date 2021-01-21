import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
