import { QuoteType } from './../enums/quote.enum';
import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ISerializer } from '../interfaces/ISerializer';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { QueryOptions } from '../models/query-options.model';
@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  url: string
  version: string
  endpoint: string
  constructor(
    public httpClient: HttpClient
  ) {
    this.url = environment.apis.papelaria_facil_api;
    this.version = 'v1';
    this.endpoint = 'quotes';
  }

  public create(item: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/${this.version}/${this.endpoint}`, item)
  }

  getTypes(queryOptions?: any) {
    return of([
      {
        id: QuoteType.SUPPLIES_LIST,
        display_name: "Lista escolar"
      },
      {
        id: QuoteType.CUSTOM_LIST,
        display_name: "Lista personalizada"
      }
    ])
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }


  public getQuantityPendingStudies(queryOptions?: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions)
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient
      .get(`${this.url}/${this.version}/${this.endpoint}/getQuantityPendingStudies${queryString}`)
  }

  public getAllInRangeDate(queryOptions: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions)
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient
      .get(`${this.url}/${this.version}/${this.endpoint}/allInRangeDate${queryString}`)
  }




}
