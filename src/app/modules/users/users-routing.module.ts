import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ListComponent } from 'src/app/modules/users/list/list.component';
import { ManageComponent } from 'src/app/modules/users/manage/manage.component';
import { UsersComponent } from 'src/app/modules/users/users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, data: {
      title: 'Usuários',
      permissions: ['ADMIN']
    }, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ListComponent, data: {
          title: 'Listagem'
        }
      },
      {
        path: 'new', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          title: 'Criação'
        }
      },
      {
        path: 'view/:id', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          title: 'Visualização'
        }
      },
      {
        path: 'edit/:id', pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ManageComponent, data: {
          title: 'Alteração'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
