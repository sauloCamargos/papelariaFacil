import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { ProductProvider } from './../models/product-provider.model';
import { ResourceService } from './resource.service';
import { ProductProviderStatus } from '../enums/product-provider.enum';
@Injectable({
  providedIn: 'root'
})
export class ProductProviderService extends ResourceService<ProductProvider> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'product-providers',
      new Serializer<ProductProvider>(new ProductProvider)
    )
  }

  getStatuslist(queryOptions?: any) {
    return of([
      {
        id: ProductProviderStatus.ACTIVATED,
        display_name: "Ativo"
      },
      {
        id: ProductProviderStatus.BLOCKED,
        display_name: "Bloqueado"
      },
    ])
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }



}
