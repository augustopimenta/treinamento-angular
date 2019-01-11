import { MoneyMaskDirective } from './money-mask.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="value" appMoneyMask>
    </form>
  `
})
class TestComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      value: ['']
    });
  }
}

describe('MoneyMaskDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ MoneyMaskDirective, TestComponent ]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format currency number', () => {
    component.form.setValue({
      value: '12000.50'
    });

    const input = fixture.nativeElement.querySelector('input');

    expect(input.value).toBe('12.000,50');
  });
});
