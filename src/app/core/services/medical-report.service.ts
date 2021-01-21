import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of } from 'rxjs';
import { ExamType } from '@app/core/enums/exam.enum';
import { MedicalReport } from '@app/core/models/medical-report.model';
@Injectable({
  providedIn: 'root'
})
export class MedicalReportService extends ResourceService<MedicalReport> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'medical-reports',
      new Serializer<MedicalReport>(new MedicalReport)
    )
  }




}
