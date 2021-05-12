import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSupplies } from '@app/core/models/user-supplies.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class UserSuppliesService extends ResourceService<UserSupplies> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'user-supplies-lists',
      new Serializer<UserSupplies>(new UserSupplies)
    )
  }

  setProducts(entityId: any, data: { products: any }): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/${entityId}/products`, data)
  }

}
