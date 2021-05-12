import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolSupplies } from '@app/core/models/school-supplies.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class SchoolSuppliesService extends ResourceService<SchoolSupplies> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'school-supplies-lists',
      new Serializer<SchoolSupplies>(new SchoolSupplies)
    )
  }

  setProducts(entityId: any, data: { products: any }): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/${entityId}/products`, data)
  }

}
