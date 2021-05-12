
import { ResourceService } from './resource.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService extends ResourceService<User> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'users',
      new Serializer<User>(new User)
    )
  }



}
