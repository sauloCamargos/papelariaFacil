import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ListComponent } from 'src/app/modules/schools/list/list.component';
import { ManageComponent } from 'src/app/modules/schools/manage/manage.component';
import { SchoolsComponent } from 'src/app/modules/schools/schools.component';
import { SuppliesManageComponent } from 'src/app/modules/schools/supplies-manage/supplies-manage.component';

const routes: Routes = [
  {
    path: '', component: SchoolsComponent, data: {
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
      },
      {
        path: 'edit/:id/supplies-list/new', pathMatch: 'full',
        canActivate: [],
        component: SuppliesManageComponent, data: {
          breadcrumb: 'Visualização'
        }
      },
      {
        path: 'edit/:id/supplies-list/edit/:idSupplies', pathMatch: 'full',
        canActivate: [],
        component: SuppliesManageComponent, data: {
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
export class SchoolsRoutingModule { }
