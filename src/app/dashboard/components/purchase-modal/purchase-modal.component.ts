import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Purchase from '../../models/purchase.model';
const moment = require('moment');

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent {

  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;
  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() finishPurchase = new EventEmitter<Purchase>();

  form: FormGroup;

  date = this.fb.control('', [ Validators.required ]);
  description = this.fb.control('', [ Validators.required ]);
  quantity = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d*$/),
    PurchaseModalComponent.notZero
  ]);
  value = this.fb.control('', [
    Validators.required,
    PurchaseModalComponent.notZero
  ]);
  paid = this.fb.control(false);
  total = this.fb.control(0);

  static notZero(control: AbstractControl): ValidationErrors | null {
    if (control.value === '') {
      return null;
    }

    const value = parseFloat(control.value);

    if (value !== 0) {
      return null;
    }

    return { notZero: true };
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: this.date,
      description: this.description,
      quantity: this.quantity,
      value: this.value,
      paid: this.paid,
      total: this.total
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  onModalFinishedClose() {
    this.firstInput.nativeElement.focus();

    this.date.setValue(moment().format('YYYY-MM-DD'));
  }

  onModalFinishedOpen() {
    this.form.reset();
  }

  onSubmit() {
    this.finishPurchase.emit(this.form.value);
  }

}
