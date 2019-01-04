import { Directive, ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import SimpleMaskMoney from 'simple-mask-money';

@Directive({
  selector: 'input[appMoneyMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MoneyMaskDirective,
    multi: true
  }]
})
export class MoneyMaskDirective implements ControlValueAccessor, OnInit {

  onChange: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const args = {
      allowNegative: false,
      negativeSignAfter: false,
      prefix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      cursor: 'end'
    };

    SimpleMaskMoney.setMask(this.el.nativeElement, args);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}

  setDisabledState(isDisabled: boolean) {}

  writeValue(obj: any) {
    const strValue = parseFloat(obj).toFixed(2).replace('.', '');

    this.el.nativeElement.value = SimpleMaskMoney.format(strValue);
  }

}
