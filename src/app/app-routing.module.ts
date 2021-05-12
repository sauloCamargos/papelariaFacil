import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'home', data: { breadcrumb: "home" }, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'admin', data: { breadcrumb: "Admin" }, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
