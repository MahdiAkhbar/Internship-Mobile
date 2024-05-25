import { Pipe, PipeTransform } from '@angular/core';
import { IWatchlist } from '../interfaces/watchList';

@Pipe({
  name: 'categpry'
})
export class CategoryPipe implements PipeTransform {

  transform(value: IWatchlist[], arg: string): any {
    if (value.length < 1 || arg === '')
      return value;
    let list: IWatchlist[] = [];
    // for (let item of value) {
    //   if (item.category === arg)
    //     list.push(item);
    // }
    return list;
  }

}
