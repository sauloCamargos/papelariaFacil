import { MakeQuoteComponent } from './make-quote/make-quote.component';
import { QuotesComponent } from './quotes.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: QuotesComponent, data: {
      title: 'Usuários',
      permissions: ['ADMIN']
    }, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'make-quote' },
      {
        path: 'make-quote', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: MakeQuoteComponent, data: {
          title: 'Realizar cotação'
        }
      },
      {
        path: 'list', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: MakeQuoteComponent, data: {
          title: 'Listagem'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
