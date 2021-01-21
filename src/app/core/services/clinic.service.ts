import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinic } from '@app/core/models/clinic.model';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class ClinicService extends ResourceService<Clinic> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'clinics',
      new Serializer<Clinic>(new Clinic)
    )
  }

  addOrUpdateAddress(clinicId, data): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/${clinicId}/address`, data)
  }
  removeAddress(clinicId, addressId): Observable<any> {
    return this.httpClient.delete(`${this.url}/${this.version}/${this.endpoint}/${clinicId}/address/${addressId}`)
  }


}
