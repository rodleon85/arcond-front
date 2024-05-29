import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCpfCnpjMask]'
})
export class CpfCnpjMaskDirective {
  private cpfMask = '000.000.000-00';
  private cnpjMask = '00.000.000/0000-00';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    let value = input.value.replace(/\D/g, '');
    console.log(value);

    if (value.length <= 11) {
        console.log('value.length <= 11');
        console.log(this.renderer.setAttribute(this.el.nativeElement, 'mask', this.cpfMask));
      this.renderer.setAttribute(this.el.nativeElement, 'mask', this.cpfMask);
    } else {
        console.log('value.length > 11');
        console.log(this.renderer.setAttribute(this.el.nativeElement, 'mask', this.cpfMask));
      this.renderer.setAttribute(this.el.nativeElement, 'mask', this.cnpjMask);
    }
  }
}
