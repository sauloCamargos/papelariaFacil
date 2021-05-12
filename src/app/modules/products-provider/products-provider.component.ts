import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-products-provider',
  templateUrl: './products-provider.component.html',
  styleUrls: ['./products-provider.component.scss']
})
export class ProductsProviderComponent implements OnInit {

  constructor(
    public appSvc: AppService
  ) { }

  ngOnInit(): void {
  }

}
