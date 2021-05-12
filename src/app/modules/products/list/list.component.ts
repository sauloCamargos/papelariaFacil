import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';
import { UserRole } from 'src/app/core/enums/user.enum';
import { Product } from 'src/app/core/models/product.model';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<Product> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover o produto?'
  successDeleteMessage = 'Produto removido com sucesso!'
  errorDeleteMessage = 'Erro ao remover produto!'
  environment = environment;
  UserRole = UserRole
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'actions',
  ];
  selection = new SelectionModel<Product>(true, []);
  constructor(
    public entitySvc: ProductService
  ) {
    super()
  }

  ngOnInit() {
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: (this.paginator? this.paginator.pageSize : this.defaultPageSize)
    })
  }


  initFilter(){
    return new Product
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
