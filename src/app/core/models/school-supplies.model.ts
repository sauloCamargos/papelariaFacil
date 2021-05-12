import { Product } from './product.model';
import { Address } from '@app/core/models/address.model';
import { Attachment } from '@app/core/models/attachment.model';
import { IResource } from '../interfaces/IResouce';
import { Resource } from './resource.model';

export class SchoolSupplies extends Resource implements IResource {
  name: string;
  grade_name: string;
  products?: Product[]
  school_id: number;
  school_grade_id: number;

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
