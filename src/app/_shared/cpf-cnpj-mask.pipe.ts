import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjMask'
})
export class CpfCnpjMaskPipe implements PipeTransform {

  private cpfMask(value: string): string {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private cnpjMask(value: string): string {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  transform(value: string): string {
    if (!value) return value;

    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 11) {
      return this.cpfMask(cleanedValue);
    } else {
      return this.cnpjMask(cleanedValue);
    }
  }
}
