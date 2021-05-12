import { Product } from 'src/app/core/models/product.model';
import { Attachment } from './attachment.model';
import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class Order extends Resource implements IResource {
  products?: Product[]

  constructor(objectJson?: any) {
    super(objectJson);
  }

  fromJson(objectJson?: any) {
    for (const key in objectJson) {
      if (objectJson.hasOwnProperty(key)) {
        this[key] = objectJson[key];
      }
    }
  }

}
