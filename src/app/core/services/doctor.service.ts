import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorService extends ResourceService<Doctor> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'doctors',
      new Serializer<Doctor>(new Doctor)
    )
  }



}
