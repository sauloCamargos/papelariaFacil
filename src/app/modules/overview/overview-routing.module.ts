import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '@app/overview/overview.component';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: OverviewComponent,
    canActivate: [AuthGuard], canActivateChild: [AuthGuard], canLoad: [AuthGuard]
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
