import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PurchaseModalComponent } from './purchase-modal.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PurchasesService } from '../../services/purchases.service';

import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { of } from 'rxjs';
import { AutoCompleteComponent } from '../../../shared/components/auto-complete/auto-complete.component';
import Purchase from '../../models/purchase.model';
const moment = require('moment');

import 'bootstrap';

describe('PurchaseModalComponent', () => {
  let component: PurchaseModalComponent;
  let fixture: ComponentFixture<PurchaseModalComponent>;
  let purchasesService: PurchasesService;

  beforeEach(async(() => {
    purchasesService = jasmine.createSpyObj('PurchasesService', [ 'search' ]);
    (purchasesService.search as jasmine.Spy).and.returnValue(of(['description1', 'description2']));

    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ PurchaseModalComponent, ModalComponent, AutoCompleteComponent ],
      providers: [
        { provide: PurchasesService, useValue: purchasesService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseModalComponent);
    component = fixture.componentInstance;
    component.descriptionOptions$ = of([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Custom validations', () => {
    it('notZero', () => {
      const validResult = PurchaseModalComponent.notZero(new FormControl('10'));
      expect(validResult).toBeNull();

      const invalidResult = PurchaseModalComponent.notZero(new FormControl('0.00'));
      expect(invalidResult).toEqual({ notZero: true });
    });
  });

  it('should not emit event when form is empty', () => {
    spyOn(component.finishPurchase, 'emit');

    component.onSubmit();

    expect(component.finishPurchase.emit).not.toHaveBeenCalled();
  });

  it('should emit finishShopping event on form submit', () => {
    spyOn(component.finishPurchase, 'emit');

    const purchase: Purchase = {
      id: '1',
      description: 'Pão de queijo',
      date: '2019-01-10',
      paid: true,
      total: 10,
      quantity: 2,
      value: 5
    };

    component.form.setValue({
      date: purchase.date,
      description: purchase.description,
      quantity: purchase.quantity,
      value: purchase.value,
      total: purchase.total,
      paid: purchase.paid
    });

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[footer]');
    submitButton.click();

    expect(component.finishPurchase.emit).toHaveBeenCalled();
  });

  it('should set current date on first input when modal finish showed', fakeAsync(() => {
    component.show();

    tick(1000);

    fixture.detectChanges();

    const firstInput: HTMLInputElement = fixture.nativeElement.querySelectorAll('input').item(0);

    expect(firstInput.value).toBe(moment().format('YYYY-MM-DD'));

    component.hide();

    tick(1000);
  }));

  it('should clear form and id when modal finish closed', fakeAsync(() => {
    spyOn(component.form, 'reset');

    const purchase: Purchase = {
      id: '1',
      description: 'Pão de queijo',
      date: '2019-01-10',
      paid: true,
      total: 10,
      quantity: 2,
      value: 5
    };

    component.show(purchase);
    tick(1000);

    component.hide();
    tick(1000);

    expect(component['id']).toBeNull();
    expect(component.form.reset).toHaveBeenCalled();
  }));

  it('should call modal show method with form data when call show', () => {
    spyOn(component.modal, 'show');
    spyOn(component.form, 'setValue');

    const purchase: Purchase = {
      id: '1',
      description: 'Pão de queijo',
      date: '2019-01-10',
      paid: true,
      total: 10,
      quantity: 2,
      value: 5
    };

    component.show(purchase);

    expect(component.form.setValue).toHaveBeenCalledWith({
      date: purchase.date,
      description: purchase.description,
      quantity: purchase.quantity,
      value: purchase.value,
      total: purchase.total,
      paid: purchase.paid
    });
    expect(component['id']).toBe(purchase.id);
    expect(component.modal.show).toHaveBeenCalled();
  });

  it('should call modal hide method when call hide', () => {
    spyOn(component.modal, 'hide');

    component.hide();

    expect(component.modal.hide).toHaveBeenCalled();
  });
});
