import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    public appSvc: AppService
  ) { }

  ngOnInit(): void {
  }

}
