import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/core/enums/user.enum';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent extends BaseListComponent<User> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover o usuário?'
  successDeleteMessage = 'Usuário removido com sucesso!'
  errorDeleteMessage = 'Erro ao remover usuário!'
  environment = environment;
  UserRole = UserRole
  displayedColumns: string[] = [
    'name',
    'username',
    'cpf',
    'email',
    'role'
  ];
  selection = new SelectionModel<User>(true, []);
  constructor(
    public entitySvc: UserService
  ) {
    super()
  }

  ngOnInit() {
    this.getDataFilter()
  }

  getDataFilter(e?) {
    console.log(e)
    this.getData(e)
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
