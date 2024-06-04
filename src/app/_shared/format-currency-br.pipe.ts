import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'formatCurrencyBr'
})
export class FormatCurrencyBrPipe implements PipeTransform {

  private currencyPipe = new CurrencyPipe('pt-BR');

  transform(value: any, currencyCode: string = 'BRL', symbolDisplay: boolean = true, digits: string = '1.2-2'): string | null {
    if (value == null) return null;
    return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
  }

}
