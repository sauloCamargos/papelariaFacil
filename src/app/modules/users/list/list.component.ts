import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/core/enums/user.enum';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<User> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover o usuário?'
  successDeleteMessage = 'Usuário removido com sucesso!'
  errorDeleteMessage = 'Erro ao remover usuário!'
  environment = environment;
  UserRole = UserRole
  displayedColumns: string[] = [
    'select',
    'status',
    'name',
    'email',
    'role',
    'actions',
  ];
  selection = new SelectionModel<User>(true, []);
  constructor(
    public entitySvc: UserService
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
    return new User
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
