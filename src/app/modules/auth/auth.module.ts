import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { DefinirSenhaComponent } from './definir-senha/definir-senha.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { AuthService } from './services/auth.service';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    ProfileComponent,
    RecuperarSenhaComponent,
    DefinirSenhaComponent,
    ValidateEmailComponent,
    VerifyEmailComponent
  ],
  providers: []
})
export class AuthModule { }
