
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/auth/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthentitcationGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.check()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.check()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
