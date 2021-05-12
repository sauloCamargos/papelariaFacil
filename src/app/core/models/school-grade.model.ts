import { Address } from '@app/core/models/address.model';
import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class SchoolGrade extends Resource implements IResource {
  name: string;
  school_id: number;

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
