import { IResource } from '../interfaces/IResouce';
import { Product } from './product.model';
import { Resource } from './resource.model';

export class UserSupplies extends Resource implements IResource {
  name: string;
  products?: Product[]
  user_id: number;

  constructor(objectJson?: any) {
    super(objectJson);
  }

}
