import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of } from 'rxjs';
import { ExamType } from '@app/core/enums/exam.enum';
import { ExamTemplate } from '@app/core/models/exam-template.model';
import { MedicalStudy } from '@app/core/models/medical-study.model';
import { MedicalStudyImage } from '@app/core/models/medical-study-image.model';
@Injectable({
  providedIn: 'root'
})
export class MedicalStudyImageService extends ResourceService<MedicalStudyImage> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'medical-studies-images',
      new Serializer<MedicalStudyImage>(new MedicalStudyImage)
    )
  }

}
