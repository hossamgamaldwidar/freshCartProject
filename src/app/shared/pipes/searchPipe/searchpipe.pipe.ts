import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(arr:any[] , searchKey:string): any[] {
    return arr.filter((current)=>current.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()));
  }

}