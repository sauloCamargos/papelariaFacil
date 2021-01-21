import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Contract } from '@app/core/models/contract.model';
import { Observable } from 'rxjs';
import { ContractExam } from '@app/core/models/contract-exam.model';
@Injectable({
  providedIn: 'root'
})
export class ContractExamService extends ResourceService<ContractExam> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'contract-exams',
      new Serializer<ContractExam>(new ContractExam)
    )
  }

}
