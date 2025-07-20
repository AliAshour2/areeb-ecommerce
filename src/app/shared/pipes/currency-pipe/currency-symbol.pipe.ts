import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: number, symbol: string = '$'): string {
    return symbol + value.toFixed(2);
  }

}
