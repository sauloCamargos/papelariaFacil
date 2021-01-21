import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { QueryOptions } from '../models/query-options.model';
import { IResource } from '../interfaces/IResouce';
import { ISerializer } from '../interfaces/ISerializer';

export class ResourceService<T extends IResource> {
  constructor(
      protected httpClient: HttpClient,
      protected url: string,
      protected version: string,
      protected endpoint: string,
      protected serializer: ISerializer
  ) { }

  public create(item: T): Observable<T> {
      return this.httpClient
          .post<T>(`${this.url}/${this.version}/${this.endpoint}`, item)
          .pipe(map(data => new Object(data) as T));
  }

  public update(id: number, item: T): Observable<T> {
      return this.httpClient
          .put<T>(`${this.url}/${this.version}/${this.endpoint}/${id}`, item)
          .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  read(id: number): Observable<T> {
      return this.httpClient
          .get(`${this.url}/${this.version}/${this.endpoint}/${id}`)
          .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  list(queryOptions?: any): Observable<any> {
      let queryString;
      if (queryOptions) {
          queryString = QueryOptions.toQueryString(queryOptions)
      }
      queryString = !!queryString ? `?${queryString}` : '';

      return this.httpClient
          .get(`${this.url}/${this.version}/${this.endpoint}${queryString}`)
          .pipe(
            tap((data) => {data.data = this.convertData(data.data)})
            );
            // map((data: any, index: number) => data.data = this.convertData(data.data))
  }

  delete(id: number) {
      return this.httpClient
          .delete(`${this.url}/${this.version}/${this.endpoint}/${id}`);
  }

  convertData(data: any): T[] {
      if(!!data){
          return data.map(item => this.serializer.fromJson(item));
      }
      return [];
  }


}
