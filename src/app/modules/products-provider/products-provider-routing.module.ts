import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductsProviderComponent } from './products-provider.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: '', component: ProductsProviderComponent, data: {
      title: 'Produtos',
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
      },
      {
        path: 'edit/:id/items-list/new', pathMatch: 'full',
        canActivate: [],
        component: ProductManageComponent, data: {
          breadcrumb: 'Visualização'
        }
      },
      {
        path: 'edit/:id/items-list/edit/:idItem', pathMatch: 'full',
        canActivate: [],
        component: ProductManageComponent, data: {
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
export class ProductsProviderRoutingModule { }
