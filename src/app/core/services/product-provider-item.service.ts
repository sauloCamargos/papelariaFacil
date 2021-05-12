import { ProductProviderItem } from './../models/product-provider-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class ProductProviderItemService extends ResourceService<ProductProviderItem> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'product-provider-items',
      new Serializer<ProductProviderItem>(new ProductProviderItem)
    )
  }





}
