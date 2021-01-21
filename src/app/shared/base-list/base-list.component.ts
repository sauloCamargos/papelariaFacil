import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IResource } from '@app/core/interfaces/IResouce';
import { ResourceService } from '@app/core/services/resource.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-base-list',
  template: '',
})
export abstract class BaseListComponent<T extends IResource> implements OnInit {

  public entitySvc!: ResourceService<T>;
  public entityList!: T[];
  public confirmationDeleteMessage!: string;
  public successDeleteMessage!: string;
  public errorDeleteMessage!: string;
  public filterParam!: string;
  public response: any;
  public inLoading!: boolean;
  public getParamObject(param: any) {
    return {}
  }
  displayedColumns: string[];
  dataSource: MatTableDataSource<T>;
  selection: SelectionModel<T>;
  constructor() { }

  ngOnInit() {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    return '';
  }

  getData(filterObject?: any) {
    this.inLoading = true;
    this.entitySvc.list(filterObject)
      .pipe(
        finalize(this.completeRequest)
      )
      .subscribe(
        (response) => {
          this.response = response;
          this.entityList = response.data;
          this.dataSource = new MatTableDataSource<T>(this.entityList);
        }
      )
  }

  public completeRequest = (function (response: any) {
    this.inLoading = false;
  }).bind(this)

  remove(id: number) {
    let confirmed = confirm(this.confirmationDeleteMessage);
    if (confirmed) {
      this.inLoading = true;
      this.entityList = [];
      this.entitySvc.delete(id)
        .pipe(
          finalize(this.completeRequest)
        )
        .subscribe(
          (response) => {
            alert(this.successDeleteMessage)
            this.getData(this.getParamObject(this.filterParam))
          },
          (error) => {
            alert(this.errorDeleteMessage);
          }
        )
    }
  }



}
