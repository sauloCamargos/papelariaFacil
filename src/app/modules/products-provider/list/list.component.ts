import { ProductProviderService } from './../../../core/services/product-provider.service';
import { ProductProvider } from './../../../core/models/product-provider.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/core/enums/user.enum';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<ProductProvider> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover o fornecedor?'
  successDeleteMessage = 'Fornecedor removido com sucesso!'
  errorDeleteMessage = 'Erro ao remover fornecedor!'
  environment = environment;
  UserRole = UserRole
  initColumns: any[] = [
    { display: 'select', name: 'select' },
    { display: '', name: 'brand_url' },
    { display: 'Nome', name: 'name' },
    { display: 'Nome fantasia', name: 'company_name' },
    { display: 'Status', name: 'status' },
    { display: 'CNPJ', name: 'cnpj' },
    { display: 'Telefone', name: 'phone' },
    { display: '', name: 'actions' }
  ];
  selection = new SelectionModel<ProductProvider>(true, []);
  constructor(
    public entitySvc: ProductProviderService
  ) {
    super()
  }

  ngOnInit() {
    this.displayedColumns = this.initColumns.map(item => item.name);
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: (this.paginator ? this.paginator.pageSize : this.defaultPageSize)
    })
  }


  initFilter() {
    return new ProductProvider
  }

  checkboxLabel(row?: ProductProvider): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
