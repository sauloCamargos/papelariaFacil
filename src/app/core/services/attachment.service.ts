import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { Attachment } from '../models/attachment.model';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService extends ResourceService<Attachment> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'attachments',
      new Serializer<Attachment>(new Attachment)
    )
  }
}
