import { Address } from '@app/core/models/address.model';
import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class School extends Resource implements IResource {
  name: string;
  state: string;
  city: string;
  address?: Address

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
