import { Injectable, Injector } from '@angular/core';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ISerializer } from '../interfaces/ISerializer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryOptions } from '../models/query-options.model';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: any;
  url: string
  version: string
  endpoint: string
  constructor(
    public httpClient: HttpClient,
    private injector: Injector
  ) {
      this.url = environment.apis.papelaria_facil_api;
      this.version = 'v1';
      this.endpoint = 'settings';
  }

   /**
   * @param {string} url
   * @returns {Promise<any>}
   */
  load(url: string) {
    const injectHttp = this.injector.get(HttpClient);
    return new Promise((resolve, reject) => {
      injectHttp
        .get(url)
        .pipe(map(res => res))
        .subscribe(
          config => {
            this.config = config;
            resolve(config);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  /**
   * @param {string} [element]
   * @param {string} [dataList]
   * @returns 'Data Lista is Index Array'
   * @memberof ConfigurationService
   */
  getConfiguration(element: string, dataList?: string) {
    if (!dataList) {
      const urlWithElement = this.config[element];
      return urlWithElement;
      // return this.verifyUrl(urlWithElement);
    } else {
      const urlWithDataList = this.config[dataList][element];
      return urlWithDataList;
      // return this.verifyUrl(urlWithDataList);
    }
  }

  public registerConfigs(item: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.url}/${this.version}/${this.endpoint}`, item);
  }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.url}/${this.version}/${this.endpoint}`);
  }

  get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${this.version}/${this.endpoint}/${id}`);
  }

  create(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.version}/${this.endpoint}`, user);
  }

  getByName(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.version}/${this.endpoint}/byName`, user);
  }

  getByNames(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.version}/${this.endpoint}/byNames`, user);
  }

  getByGroup(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.version}/${this.endpoint}/group`, user);
  }

  update(id: number, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${this.version}/${this.endpoint}/${id}`, user);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${this.version}/${this.endpoint}/${id}`);
  }




}
