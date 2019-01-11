import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPanelComponent } from './total-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TotalPanelComponent', () => {
  let component: TotalPanelComponent;
  let fixture: ComponentFixture<TotalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPanelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPanelComponent);
    component = fixture.componentInstance;
    component.pending = 10.00;
    component.total = 20.00;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pending and total values', () => {
    const total = fixture.nativeElement.querySelector('.total').textContent.trim();
    const pending = fixture.nativeElement.querySelector('.pending').textContent.trim();

    expect(total).toBe('R$20.00');
    expect(pending).toBe('R$10.00');
  });
});
