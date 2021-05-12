import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolGrade } from '@app/core/models/school-grade.model';
import { School } from '@app/core/models/school.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class SchoolGradeService extends ResourceService<SchoolGrade> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'school-grades',
      new Serializer<SchoolGrade>(new SchoolGrade)
    )
  }


}
