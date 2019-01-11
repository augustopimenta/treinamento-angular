import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true
  }]
})
export class AutoCompleteComponent implements ControlValueAccessor {

  @Input() name: string;
  @Input() invalid: boolean;
  @Input() options: string[];

  onChange: any;
  onTouched: any;

  value: string;

  dropdownOpen = false;

  selectedIndex = 0;

  clickItem(value) {
    this.updateChanges(value);
    this.dropdownOpen = false;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {}

  writeValue(value: any) {
    this.value = value;
  }

  updateChanges(value) {
    this.value = value;
    this.onChange(value);
  }

  onInputFocus(event) {
    this.dropdownOpen = true;
    this.selectedIndex = 0;

    event.target.focus();
    event.target.select();
  }

  onInputFocusOut() {
    this.dropdownOpen = false;
  }

  onInputKeyUp(event) {
    switch (event.code) {
      case 'Enter':
        if (this.options.length > 0) {
          this.updateChanges(this.options[this.selectedIndex]);
          this.dropdownOpen = false;
        }
        break;
      case 'ArrowUp':
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        break;
      case 'ArrowDown':
        this.selectedIndex = Math.min(this.options.length - 1, this.selectedIndex + 1);
        break;
    }
  }

}
