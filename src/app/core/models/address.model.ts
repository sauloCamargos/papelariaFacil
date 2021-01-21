import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class Address extends Resource implements IResource {
  zip_code: string
  public_place: string
  number: string
  complement: string
  neighborhood: string
  city: string
  uf: string

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
