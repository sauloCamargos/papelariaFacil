import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Contract } from '@app/core/models/contract.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContractService extends ResourceService<Contract> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'contracts',
      new Serializer<Contract>(new Contract)
    )
  }


  addExam(contractId, data): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/${contractId}/exams`, data)
  }
  removeExam(contractId, examId): Observable<any> {
    return this.httpClient.delete(`${this.url}/${this.version}/${this.endpoint}/${contractId}/exams`)
  }

}
