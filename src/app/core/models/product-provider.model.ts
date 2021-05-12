import { Attachment } from './attachment.model';
import { Resource } from './resource.model';
import { IResource } from '../interfaces/IResouce';

export class ProductProvider extends Resource implements IResource {
  name: string;
  company_name: string;
  status: string;
  cnpj: string;
  phone: string;
  brand_url: string;
  brand: Attachment;

  constructor(objectJson?: any) {
    super(objectJson);
  }
  fromJson(objectJson?: any) {
    for (const key in objectJson) {
      if (objectJson.hasOwnProperty(key)) {
        this[key] = objectJson[key];
      }
    }

    if (objectJson && objectJson.brand) {
      this.brand_url = objectJson.brand.url
    }
  }
}
