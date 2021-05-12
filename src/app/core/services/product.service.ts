import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { Product } from './../models/product.model';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService extends ResourceService<Product> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'products',
      new Serializer<Product>(new Product)
    )
  }



}
