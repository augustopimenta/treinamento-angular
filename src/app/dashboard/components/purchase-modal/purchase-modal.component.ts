import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Purchase from '../../models/purchase.model';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PurchasesService } from '../../services/purchases.service';
const moment = require('moment');

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent implements OnInit, OnDestroy {

  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;
  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() finishPurchase = new EventEmitter<Purchase>();

  form: FormGroup;
  id?: string = null;

  private subscription: Subscription;

  date = this.fb.control('', [ Validators.required ]);
  description = this.fb.control('', [ Validators.required ]);
  quantity = this.fb.control(1, [
    Validators.required,
    Validators.pattern(/^\d*$/),
    PurchaseModalComponent.notZero
  ]);
  value = this.fb.control(0, [
    Validators.required,
    PurchaseModalComponent.notZero
  ]);
  paid = this.fb.control(false);
  total = this.fb.control(0);

  descriptionOptions$ = this.description.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(description => this.purchasesService.search(description)),
  );

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

  constructor(private fb: FormBuilder, private purchasesService: PurchasesService) {
    this.form = this.fb.group({
      date: this.date,
      description: this.description,
      quantity: this.quantity,
      value: this.value,
      paid: this.paid,
      total: this.total
    });
  }

  ngOnInit() {
    this.subscription = this.form.valueChanges.pipe(
      map(data => {
        const quantity = +data.quantity;
        const value = parseFloat(data.value);
        const total = quantity * value;

        return isNaN(total) ? 0.0 : total;
      }),
      distinctUntilChanged()
    ).subscribe(total => {
      this.total.setValue(total);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show(purchase: Purchase = null) {
    if (purchase) {
      this.id = purchase.id;

      this.form.setValue({
        date: purchase.date,
        description: purchase.description,
        quantity: purchase.quantity,
        value: purchase.value,
        total: purchase.total,
        paid: purchase.paid
      });
    }

    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  onModalFinishedOpen() {
    this.firstInput.nativeElement.focus();

    if (!this.id) {
      this.date.setValue(moment().format('YYYY-MM-DD'));
    }
  }

  onModalFinishedClose() {
    this.id = null;
    this.form.reset({
      date: '',
      description: '',
      quantity: 1,
      value: 0,
      paid: false,
      total: 0
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.finishPurchase.emit({ ...this.form.value, id: this.id });
  }

}
