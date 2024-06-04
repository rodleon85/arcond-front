import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy', locale: string = 'pt-BR'): string | null {
    if (!value) return null;
    return formatDate(value, format, locale);
  }

}
