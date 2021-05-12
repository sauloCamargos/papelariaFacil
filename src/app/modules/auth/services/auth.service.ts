import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { environment } from '@app/environments/environment';
import { QueryOptions } from '@app/core/models/query-options.model';
import { User } from '@app/core/models/user.model';



@Injectable({
  providedIn: "root"
})
export class AuthService {
  public apiVersion = ''
  constructor(private http: HttpClient, private router: Router) { }

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/auth/token`, credentials)
      .pipe(
        tap(data => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('token_type', data.token_type);
          // data.user.role = (data.user.role == 1)? 'admin': 'customer';
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        })
      )
  }

  resendEmailVerifying(credentials): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/email/resend`, credentials);
  }

  verifyEmail(dataSend): Observable<boolean> {
    let queryString;
    if (dataSend.query) {
      queryString = QueryOptions.toQueryString(dataSend.query);
    }
    queryString = !!queryString ? `?${queryString}` : "";
    return this.http
      .get<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/email/verify/${dataSend.id}/${dataSend.hash}${queryString}`);
  }

  logout(): void {
    this.http
      .post(`${environment.apis.papelaria_facil_api}${this.apiVersion}/logout`, {})
      .subscribe(
        resp => {
          localStorage.clear();
          this.router.navigate(["auth/login"], { replaceUrl: true });
        },
        error => {
          localStorage.clear();
          this.router.navigate(["auth/login"], { replaceUrl: true });
        }
      );
  }

  getUser(): User {
    try {
      return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
    } catch (e) {
      this.logout();
      return undefined;
    }
  }

  getAccessToken() {
    try {
      return localStorage.getItem("access_token") || null;
    } catch (error) {
      return null;
    }
  }

  getRefreshToken() {
    try {
      return localStorage.getItem("refresh_token") || null;
    } catch (error) {
      return null;
    }
  }

  setUser(): Observable<any> {
    return this.http.get<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/auth`)
      .pipe(
        tap(data => {
          if (data.user) {
            localStorage.setItem('user', btoa(JSON.stringify(data.user)));
            return true;
          }
          return false;
        })
      )

  }

  resetPassword(data: any) {
    return this.http.post<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/password/email`, data);
  }

  setNewPassword(data: any) {
    return this.http.post<any>(`${environment.apis.papelaria_facil_api}${this.apiVersion}/password/reset`, data);
  }

}
