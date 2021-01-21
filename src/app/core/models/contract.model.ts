import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class Contract extends Resource implements IResource {
  started_at: string;
  finished_at: string;
  clinic_id: string;

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
