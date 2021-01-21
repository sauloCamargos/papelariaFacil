import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthentitcationGuard } from "@app/core/guards/authentitcation.guard";
import { AuthComponent } from './auth.component';
import { DefinirSenhaComponent } from './definir-senha/definir-senha.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthentitcationGuard],
        canActivateChild: [AuthentitcationGuard]
      },
      {
        path: "validate-email",
        component: ValidateEmailComponent,
        canActivate: [],
        canActivateChild: []
      },
      {
        path: "api/email/verify/:id/:hash",
        component: VerifyEmailComponent,
        canActivate: [],
        canActivateChild: []
      },
      // {
      //   path: "signup",
      //   component: SignUpComponent,
      //   canActivate: [AuthentitcationGuard],
      //   canActivateChild: [AuthentitcationGuard]
      // },
      {
        path: "recuperar-senha",
        component: RecuperarSenhaComponent,
        canActivate: [AuthentitcationGuard],
        canActivateChild: [AuthentitcationGuard]
      },
      {
        path: "definir-senha/:token",
        component: DefinirSenhaComponent,
        canActivate: [AuthentitcationGuard],
        canActivateChild: [AuthentitcationGuard]
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
