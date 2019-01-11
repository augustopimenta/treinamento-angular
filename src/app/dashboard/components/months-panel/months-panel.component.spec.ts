import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsPanelComponent } from './months-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

describe('MonthsPanelComponent', () => {
  let component: MonthsPanelComponent;
  let fixture: ComponentFixture<MonthsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthsPanelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ DatePipe, CurrencyPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsPanelComponent);
    component = fixture.componentInstance;
    component.selectedMonthIndex = 0;
    component.months = [
      {date: new Date(2018, 11, 1), pending: 10, total: 10 },
      {date: new Date(2018, 10, 1), pending: 50, total: 50 },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render month items', () => {
    const months = fixture.nativeElement.querySelectorAll('.month');

    const date: DatePipe = TestBed.get(DatePipe);
    const currency: CurrencyPipe = TestBed.get(CurrencyPipe);

    months.forEach((month, i) => {
      const data = component.months[i];

      const name = month.querySelector('.name').textContent.trim();
      const total = month.querySelector('.total span').textContent.trim();
      const pending = month.querySelector('.pending span').textContent.trim();

      expect(name).toBe(date.transform(data.date, 'MMM/yyyy'));
      expect(total).toBe(currency.transform(data.total, 'R$'));
      expect(pending).toBe(currency.transform(data.pending, 'R$'));
    });

    expect(months.length).toBe(component.months.length);
  });

  it('should active selectedMonthIndex', () => {
    const month = fixture.nativeElement.querySelectorAll('.month').item(component.selectedMonthIndex);

    expect(month.classList.contains('active')).toBe(true);
  });

  it('should emit select when click on month', () => {
    spyOn(component.select, 'emit');

    const months = fixture.nativeElement.querySelectorAll('.month');
    months.item(1).click();

    expect(component.select.emit).toHaveBeenCalledWith({ index: 1, month: component.months[1] });
  });
});
