import { ProductProviderItemService } from './../../../core/services/product-provider-item.service';
import { ProductProviderItem } from './../../../core/models/product-provider-item.model';
import { ProductProviderService } from './../../../core/services/product-provider.service';
import { ProductProvider } from './../../../core/models/product-provider.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/core/enums/user.enum';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-provider-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseListComponent<ProductProviderItem> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover o item do fornecedor?'
  successDeleteMessage = 'Item removido com sucesso!'
  errorDeleteMessage = 'Erro ao remover item!'
  environment = environment;
  UserRole = UserRole
  initColumns: any[] = [
    { display: 'select', name: 'select' },
    { display: 'Nome', name: 'name' },
    { display: 'Valor', name: 'amount' },
    { display: 'Detalhes', name: 'description' },
    { display: '', name: 'actions' }
  ];
  selection = new SelectionModel<ProductProviderItem>(true, []);
  parentId: any;
  public defaultPageSize = 5;
  public defaulPageSizeOptions = [5, 10, 25, 50, 100];
  constructor(
    public entitySvc: ProductProviderItemService,
    public activatedRoute: ActivatedRoute
  ) {
    super()
  }

  ngOnInit() {
    this.displayedColumns = this.initColumns.map(item => item.name);
    this.parentId = +this.activatedRoute.snapshot.params.id;
    this.filter = this.initFilter();
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: this.paginator ? this.paginator.pageSize : this.defaultPageSize,
    });
  }

  initFilter() {
    return new ProductProviderItem({ product_provider_id: this.parentId });
  }

  checkboxLabel(row?: ProductProviderItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
