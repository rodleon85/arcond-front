import { Pipe, PipeTransform } from '@angular/core';
import { MONTHS } from './constants';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(value: number): string {
    const month = MONTHS.find(month => month.value === value);
    return month ? month.viewValue : '';
  }

}
