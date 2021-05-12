import { Product } from 'src/app/core/models/product.model';
import { Attachment } from '@app/core/models/attachment.model';
import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class ProductProviderItem extends Resource implements IResource {
  name: string;
  description: string;
  amount: number;
  image: Attachment
  product: Product

  constructor(objectJson?: any) {
    super(objectJson);
  }

  fromJson(objectJson?: any) {
    for (const key in objectJson) {
      if (objectJson.hasOwnProperty(key)) {
        this[key] = objectJson[key];
      }
    }

    if (objectJson && objectJson.product) {
      this.name = objectJson.product.name
    }
  }

}
