import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolSupplies } from '@app/core/models/school-supplies.model';
import { State } from '@app/core/models/state.model';
import { IBGEService } from '@app/core/services/ibge.service';
import { SchoolSuppliesService } from '@app/core/services/school-supplies.service';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrls: ['./supplies-list.component.scss'],
})
export class SuppliesListComponent
  extends BaseListComponent<SchoolSupplies>
  implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover a série escolar?';
  successDeleteMessage = 'Série escolar removida com sucesso!';
  errorDeleteMessage = 'Erro ao remover série escolar!';
  environment = environment;
  statesList: State[] = [];
  parentId: number;
  displayedColumns: string[] = ['select',  'grade_name', 'actions'];
  selection = new SelectionModel<SchoolSupplies>(true, []);
  constructor(
    public entitySvc: SchoolSuppliesService,
    public ibgeSvc: IBGEService,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.parentId = +this.activatedRoute.snapshot.params.id;
    this.filter = this.initFilter();
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: this.paginator ? this.paginator.pageSize : this.defaultPageSize,
    });
  }

  initFilter() {
    return new SchoolSupplies({ school_id: this.parentId });
  }

  successListCallback = function (response) {
    this.entityList.forEach((element) => {
      let stateOfSchool = this.statesList.find(
        (item) => item.initial.toUpperCase() == element.state.toUpperCase()
      );
      if (stateOfSchool) element.state = stateOfSchool.name;
    });
  }.bind(this);

  checkboxLabel(row?: SchoolSupplies): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
