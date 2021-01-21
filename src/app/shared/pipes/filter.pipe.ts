import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList',
  pure: false
})
export class FilterListPipe implements PipeTransform {

  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(item: any, filter: any): boolean {
    
    for (let field in filter) {
      if (filter[field]) {
        if(item[field] == null || item[field] == undefined){
          return true;
        }

        if (typeof filter[field] === 'string') {
          if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (item[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
