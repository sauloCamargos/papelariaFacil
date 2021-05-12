import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IResource } from '@app/core/interfaces/IResouce';
import { ResourceService } from '@app/core/services/resource.service';
import { Subscription } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';

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
  public resultsLength = 0;
  public isLoadingResults = true;
  public paginatorSubscribe: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public defaultPageSize = 10;
  public filter: T;
  public successListCallback: any;
  public defaulPageSizeOptions = [10, 25, 50, 100];

  public getParamObject(param: any) {
    return {}
  }
  displayedColumns: string[];
  dataSource: MatTableDataSource<T> = new MatTableDataSource([]);
  selection: SelectionModel<T>;
  constructor() { }

  ngOnInit() { }

  setDatasourceSort() {
    this.dataSource.sort = this.sort;
  }

  setDatasourcePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  setPaginatorSubscription() {
    if (!this.paginator) {
      return
    }
    if (this.paginatorSubscribe) {
      this.paginatorSubscribe.unsubscribe();
    }
    this.paginatorSubscribe = this.paginator.page.subscribe(data => {
      // this.data = data
      this.defaultPageSize = data.pageSize;
      this.getDataFilter({
        qtd: this.defaultPageSize,
        page: (data.pageIndex + 1)
      })
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.selection && this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
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

  getDataFilter(e?) {
    var filterList = this.filter;
    const dataFilter = {
      ...e,
      ...filterList
    }
    this.getData(dataFilter)
  }

  clearFilter() {
    this.filter = this.initFilter();
    this.getDataFilter()
  }

  initFilter(): T {
    return {} as T;
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
          this.entityList = [...response.data];
          this.dataSource.data = [...this.entityList];
          this.setPaginatorSubscription();
          this.paginator.pageSize = this.defaultPageSize;
          this.paginator.length = this.response.meta.total;

          if (typeof this.successListCallback == 'function') {
            this.successListCallback()
          }
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
