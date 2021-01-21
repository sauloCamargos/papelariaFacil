import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of } from 'rxjs';
import { ExamType } from '@app/core/enums/exam.enum';
@Injectable({
  providedIn: 'root'
})
export class ExamService extends ResourceService<Exam> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'exams',
      new Serializer<Exam>(new Exam)
    )
  }

  getTypes(queryOptions?: any) {
    return this.httpClient.get(`${this.url}/${this.version}/${this.endpoint}/types`)
  }



}
