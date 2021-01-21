import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of, Observable } from 'rxjs';
import { ExamClassification, ExamType } from '@app/core/enums/exam.enum';
import { ExamTemplate } from '@app/core/models/exam-template.model';
import { MedicalStudy } from '@app/core/models/medical-study.model';
@Injectable({
  providedIn: 'root'
})
export class MedicalStudyService extends ResourceService<MedicalStudy> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'medical-studies',
      new Serializer<MedicalStudy>(new MedicalStudy)
    )
  }

  getImagesInfo(id: string): Observable<MedicalStudy> {
    return this.httpClient.get<MedicalStudy>(`${this.url}/${this.version}/${this.endpoint}/${id}/images-info`);
  }

  validateStudyImported(data: { study_id: number, classification: number, observation: string }): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/validateStudyImported`, data);
  }

  setStarterStudy(data: { study_id: number, doctor_id: number }): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/setStarterStudy`, data);
  }

  setReleasedMedicalReport(data: { study_id: number, doctor_id: number }): Observable<any> {
    return this.httpClient.post(`${this.url}/${this.version}/${this.endpoint}/setReleasedMedicalReport`, data);
  }

  getClassificationList() {
    return of([
      {
        id: ExamClassification.IMMEDIATE,
        display_name: "Emergência"
      },
      {
        id: ExamClassification.VERY_URGENT,
        display_name: "Muito urgente"
      },
      {
        id: ExamClassification.URGENT,
        display_name: "Urgente"
      },
      {
        id: ExamClassification.ROUTINE,
        display_name: "Pouco urgente"
      },
      {
        id: ExamClassification.NON_URGENT,
        display_name: "Não urgente"
      }
    ])
  }



}
