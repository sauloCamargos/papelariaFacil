import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clinic } from '@app/core/models/clinic.model';
import { MedicalStudy } from '@app/core/models/medical-study.model';
import { QueryOptions } from '@app/core/models/query-options.model';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class ReportService extends ResourceService<Clinic> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'reports',
      new Serializer<Clinic>(new Clinic)
    )
  }

  getReportExecutedStudiesToDoctor(queryOptions?: any): Observable<any> {
    let queryString;
    if (queryOptions) {
      queryString = QueryOptions.toQueryString(queryOptions)
    }
    queryString = !!queryString ? `?${queryString}` : '';

    return this.httpClient
      .get(`${this.url}/${this.version}/${this.endpoint}/getReportExecutedStudiesToDoctor${queryString}`)
      .pipe(
        map((data: any, index: number) => data.data = this.convertDataMedicalStudy(data.data))
      )
  }

  convertDataMedicalStudy(data: any): any[] {
    var serializer = new Serializer<MedicalStudy>(new MedicalStudy)
    if(!!data){
        return data.map(item => serializer.fromJson(item));
    }
    return [];
}





}
