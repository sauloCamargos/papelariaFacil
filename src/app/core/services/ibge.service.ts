import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { State } from '../models/state.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Observable, of } from 'rxjs';
import { QueryOptions } from '../models/query-options.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class IBGEService{
  constructor(public httpClient: HttpClient) {}

  list(queryOptions?: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions);
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }

  listStates(queryOptions?: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions);
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados${queryString}`)
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }

  listCities(UF, queryOptions?: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions);
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios${queryString}`)
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }
}
