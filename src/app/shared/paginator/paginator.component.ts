import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  pagination: any;
  ngOnChanges(changes: SimpleChanges): void {
    if(this.config){
      // const params = this.filterParams();
      // this.config = Object.assign(this.config, params);
      this.config = this.config.meta;

      // current_page: 1
      // from: 1
      // last_page: 7
      // path: "http://localhost/cdi_api/public/api/v1/solicitations"
      // per_page: 15
      // to: 15
      // total: 93

      if(!this.pagination){
        this.initPagination();
      }
    }
  }

  @Input() config: any
  @Output() activatedPage = new EventEmitter();
  constructor() { }

  ngOnInit() {
    setTimeout(() => {

    }, 1000);
  }

  initPagination(){
    var $this = this;
    if(this.pagination){
      this.pagination.pagination('destroy');
    }
    this.pagination = $('#pagination-container').pagination({
      dataSource: function(done){
          var result = [];
          for (var i = 1; i <= $this.config.total; i++) {
              result.push(i);
          }
          done(result);
      },
      pageSize: $this.config.per_page,
      shototalNumberwNavigator: true,
      callback: function(data, pagination) {
          $this.setPage(pagination.pageNumber,pagination.pageSize)
          // template method of yourself
          // var html = template(data);
          // $('#data-container').html(html);
      }
  })
  }

  filterParams(){
    let paramsFirstPage, paramsLastPage, paramsNextPage, paramsPrevPage ;
    paramsFirstPage = this.config.first_page_url;
    paramsLastPage  = this.config.last_page_url;
    paramsNextPage  = this.config.next_page_url;
    paramsPrevPage  = this.config.prev_page_url;
    const elements = [paramsFirstPage, paramsLastPage, paramsNextPage, paramsPrevPage];
    const elementsIndex = ['params_first_page', 'params_last_page', 'params_next_page', 'params_prev_page'];
    const arrayReturn = [];
    let $this = this;
    elements.forEach((item, index) => {
      if(item){
        let obj = {query_uri: undefined,qtd:undefined,page:undefined};
        obj.query_uri = item.replace($this.config.path,'');
        var myRe = /qtd=(.*)&page=(.*)/;
        var myArray = myRe.exec(obj.query_uri);
        obj.qtd = myArray[1];
        obj.page = myArray[2];
        arrayReturn[elementsIndex[index]] = obj;
      }
    });
     return arrayReturn;
  }

  getPages(){
    if(this.config){
      const per_page = parseInt(this.config.per_page.toString());
      const total = (this.config.total.toString());
      const rest = total % per_page;
      let numberPages = parseInt(( total / per_page ).toString());
      if(rest > 0){
        numberPages = numberPages + 1;
      }
      const variavel = []
      for (let i = 1; i <= numberPages; i++) {
        const aux = {
          page_number: i
        }
        variavel.push(aux);
      }
      return variavel;
    }
    return null;
  }

  setPage(page, qtd?){
    if(!this.hasCurrent(page)){
      const qtd = (this.config.per_page)? this.config.per_page : undefined;
      this.activatedPage.emit({page: page,qtd: qtd});
    }
  }

  hasCurrent(page){
    return page == this.config.current_page
  }

}
