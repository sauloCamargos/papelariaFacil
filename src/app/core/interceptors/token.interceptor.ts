import { Observable } from 'rxjs';
import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '@app/auth/services/auth.service';

export const TOKEN_INTERCEPTOR_BLACKLIST = new InjectionToken<RegExp[]>('Configuration for token interceptor');

@Injectable({
  providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
  blacklist: RegExp[] = [];
  constructor(public auth: AuthService,
    @Optional() @Inject(TOKEN_INTERCEPTOR_BLACKLIST) blacklist: RegExp[]) {
    if (blacklist) { this.blacklist = blacklist; }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(this.addAuthenticationToken(request))
  }

  blacklistCheckup($url: string): boolean {
    let returnValue = false;

    for (const i of Object.keys(this.blacklist)) {
      if (this.blacklist[i].exec($url) !== null) {
        returnValue = true;
        break;
      }
    }

    return returnValue;
  }

  addAuthenticationToken(request) {
    // Get access token from Local Storage
    const accessToken = this.auth.getAccessToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken || this.blacklistCheckup(request.url) ) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth.getAccessToken()
      }
    });
  }
}
