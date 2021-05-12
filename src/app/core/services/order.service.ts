import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Order } from './../models/order.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService extends ResourceService<Order> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'orders',
      new Serializer<Order>(new Order)
    )
  }

  public create(item: any): Observable<any> {
    return this.httpClient
        .post<any>(`${this.url}/${this.version}/${this.endpoint}`, item);
}

}
