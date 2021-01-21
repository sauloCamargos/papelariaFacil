import { Address } from '@app/core/models/address.model';
import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class Clinic extends Resource implements IResource {
  name: string;
  company_name: string;
  cnpj: string;
  phone: string;
  brand: Attachment
  address?: Address

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
