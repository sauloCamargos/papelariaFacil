import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from '@app/core/models/school.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class SchoolService extends ResourceService<School> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'schools',
      new Serializer<School>(new School)
    )
  }

  addOrUpdateAddress(schoolId, data): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/${schoolId}/address`, data)
  }
  removeAddress(schoolId, addressId): Observable<any> {
    return this.httpClient.delete(`${this.url}/${this.version}/${this.endpoint}/${schoolId}/address/${addressId}`)
  }


}
