import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { State } from '@app/core/models/state.model';
import { IBGEService } from '@app/core/services/ibge.service';
import { School } from 'src/app/core/models/school.model';
import { SchoolService } from 'src/app/core/services/school.service';
import { BaseListComponent } from 'src/app/shared/base-list/base-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent extends BaseListComponent<School> implements OnInit {
  confirmationDeleteMessage = 'Deseja realmente remover a escola?'
  successDeleteMessage = 'Escola removida com sucesso!'
  errorDeleteMessage = 'Erro ao remover escola!'
  environment = environment;
  statesList: State[] = []
  displayedColumns: string[] = [
    'select',
    'name',
    'state',
    'city',
    'actions',
  ];
  selection = new SelectionModel<School>(true, []);
  constructor(
    public entitySvc: SchoolService,
    public ibgeSvc: IBGEService
  ) {
    super()
  }

  ngOnInit() {
    this.getStates()
    this.setDatasourcePaginator();
    this.setPaginatorSubscription();
    this.getDataFilter({
      qtd: (this.paginator ? this.paginator.pageSize : this.defaultPageSize)
    })
  }


  initFilter() {
    return new School
  }

  successListCallback = (function (response) {
    // this.entityList.forEach(element => {
    //   let stateOfSchool = this.statesList.find(item => item.sigla.toUpperCase() == element.state.toUpperCase());
    //   if (stateOfSchool)
    //     element.state = stateOfSchool.name;
    // });
  }).bind(this)

  checkboxLabel(row?: School): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getStates() {
    this.ibgeSvc.listStates().subscribe(
      (response: State[]) => {
        this.statesList = response;
      }
    )
  }

}
