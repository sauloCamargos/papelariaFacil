import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SuppliesListComponent } from './supplies-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: SuppliesListComponent, data: {
      permissions: ['ADMIN']
    }, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ListComponent, data: {
          breadcrumb: 'Listagem'
        }
      },
      {
        path: 'new', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          breadcrumb: 'Criação'
        }
      },
      {
        path: 'view/:id', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          // breadcrumb: 'Visualização'
        }
      },
      {
        path: 'edit/:id', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          breadcrumb: 'Alteração'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesListRoutingModule { }
