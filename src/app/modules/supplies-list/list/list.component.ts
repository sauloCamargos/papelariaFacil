import { AuthService } from '@app/auth/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from '@app/core/models/state.model';
import { IBGEService } from '@app/core/services/ibge.service';
import { UserSuppliesService } from '@app/core/services/user-supplies.service';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';
import { UserSupplies } from './../../../core/models/user-supplies.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseListComponent<UserSupplies> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover a série escolar?';
  successDeleteMessage = 'Série escolar removida com sucesso!';
  errorDeleteMessage = 'Erro ao remover série escolar!';
  environment = environment;
  statesList: State[] = [];
  parentId: number;
  displayedColumns: string[] = ['select', 'name', 'actions'];
  selection = new SelectionModel<UserSupplies>(true, []);
  constructor(
    public entitySvc: UserSuppliesService,
    public ibgeSvc: IBGEService,
    public activatedRoute: ActivatedRoute,
    public authSvc: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.parentId = this.authSvc.getUser().id;
    this.filter = this.initFilter();
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: this.paginator ? this.paginator.pageSize : this.defaultPageSize,
    });
  }

  initFilter() {
    return new UserSupplies({ user_id: this.parentId });
  }

  successListCallback = function (response) {
    this.entityList.forEach((element) => {
      let stateOfSchool = this.statesList.find(
        (item) => item.initial.toUpperCase() == element.state.toUpperCase()
      );
      if (stateOfSchool) element.state = stateOfSchool.name;
    });
  }.bind(this);

  checkboxLabel(row?: UserSupplies): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }
}
