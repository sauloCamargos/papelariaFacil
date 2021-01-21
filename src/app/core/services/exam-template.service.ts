import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of } from 'rxjs';
import { ExamType } from '@app/core/enums/exam.enum';
import { ExamTemplate } from '@app/core/models/exam-template.model';
@Injectable({
  providedIn: 'root'
})
export class ExamTemplateService extends ResourceService<ExamTemplate> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'exam-templates',
      new Serializer<ExamTemplate>(new ExamTemplate)
    )
  }

}
