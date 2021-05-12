import { OrdersModule } from './../orders/orders.module';
import { SuppliesListModule } from './../supplies-list/supplies-list.module';
import { QuotesModule } from './../quotes/quotes.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/modules/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', data: { breadcrumb: "Admin" }, loadChildren: () => import('../overview/overview.module').then(m => m.OverviewModule) },
      { path: 'users', data: { breadcrumb: "Usuários" }, loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'products', data: { breadcrumb: "Produtos" }, loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)},
      { path: 'products-provider', data: { breadcrumb: "Fornecedor" }, loadChildren: () => import('../products-provider/products-provider.module').then(m => m.ProductsProviderModule)},
      { path: 'supplies-lists', data: { breadcrumb: "Lista de suplementos" }, loadChildren: () => import('../supplies-list/supplies-list.module').then(m => m.SuppliesListModule)},
      { path: 'quotes', data: { breadcrumb: "Cotação" }, loadChildren: () => import('../quotes/quotes.module').then(m => m.QuotesModule)},
      { path: 'orders', data: { breadcrumb: "Pedidos" }, loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)},
      { path: 'shopping-cart', data: { breadcrumb: "Carrinho" }, loadChildren: () => import('../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)},
      { path: 'schools', data: { breadcrumb: "Escolas" }, loadChildren: () => import('../schools/schools.module').then(m => m.SchoolsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
