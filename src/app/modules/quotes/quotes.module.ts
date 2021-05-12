import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { ListComponent } from './list/list.component';
import { MakeQuoteComponent } from './make-quote/make-quote.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';


@NgModule({
  declarations: [QuotesComponent, ListComponent, MakeQuoteComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }
