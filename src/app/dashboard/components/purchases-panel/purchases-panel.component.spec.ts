import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesPanelComponent } from './purchases-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

describe('PurchasesPanelComponent', () => {
  let component: PurchasesPanelComponent;
  let fixture: ComponentFixture<PurchasesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesPanelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ DatePipe, CurrencyPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesPanelComponent);
    component = fixture.componentInstance;
    component.purchases = [
      {id: '1', paid: true, date: '2018-12-01', quantity: 1, description: 'Pão de Queijo', value: 4, total: 4 },
      {id: '2', paid: true, date: '2018-12-02', quantity: 2, description: 'Pão de Queijo', value: 4, total: 8 },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when no purchases provided', () => {
    component.purchases = [];

    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('.empty-message');

    expect(message).toBeTruthy();
  });

  it('should display purchase table', () => {
    const lines = fixture.nativeElement.querySelectorAll('tbody tr');

    const date: DatePipe = TestBed.get(DatePipe);
    const currency: CurrencyPipe = TestBed.get(CurrencyPipe);

    lines.forEach((line, i) => {
      const columns = line.querySelectorAll('td');
      const data = component.purchases[i];

      const dateFormatted = columns.item(0).textContent.trim();
      const valueFormatted = columns.item(3).textContent.trim();
      const totalFormatted = columns.item(4).textContent.trim();

      expect(dateFormatted).toBe(date.transform(data.date, 'dd/MM/yyyy'));
      expect(valueFormatted).toBe(currency.transform(data.value, 'R$'));
      expect(totalFormatted).toBe(currency.transform(data.total, 'R$'));
    });

    expect(lines.length).toBe(component.purchases.length);
  });

  it('should emit add event when click new button', () => {
    spyOn(component.addPurchase, 'emit');

    const button = fixture.nativeElement.querySelector('#add');
    button.click();

    expect(component.addPurchase.emit).toHaveBeenCalled();
  });

  it('should emit toggle, edit and delete events from line buttons', () => {
    spyOn(component.togglePurchase, 'emit');
    spyOn(component.updatePurchase, 'emit');
    spyOn(component.deletePurchase, 'emit');

    const line = fixture.nativeElement.querySelectorAll('tbody tr').item(0);
    const data = component.purchases[0];

    line.querySelector('#toggle').click();
    expect(component.togglePurchase.emit).toHaveBeenCalledWith(data);

    line.querySelector('#update').click();
    expect(component.updatePurchase.emit).toHaveBeenCalledWith(data);

    line.querySelector('#delete').click();
    expect(component.deletePurchase.emit).toHaveBeenCalledWith(data);
  });
});
