
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums/user.enum';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  UserRole = UserRole

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    if (this.auth.check() && this.validatePermissions(route)) {
      return true;
    }

    this.router.navigate(['auth/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    if (this.auth.check() && this.validatePermissions(route)) {
      return true;
    }

    this.router.navigate(['auth/login']);
    return false;
  }

  validatePermissions(route): boolean {

    let user = this.auth.getUser();

    if (!!!user) {
      return false;
    }

    if(!!!user.email_verified_at){
      this.router.navigate(['/auth/validate-email'])
      // Swal.fire("Erro!", "E-mail ainda não foi validado!<br>Siga as instruções encaminhadas ao seu e-mail, faça login novamente para ter acesso ao KOTAI.", "error");
      // this.auth.logout()
    }

    if (!!!route.data.permissions) {
      return true;
    }

    if(route.data.permissions.includes(UserRole[user.role])){
      return true;
    }

    alert('Você não tem permissão de acessar está página!')
    return false;


  }
}
