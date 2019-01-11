import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoCompleteComponent } from './auto-complete.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-test',
  template: `
    <form [formGroup]="form">
      <app-auto-complete formControlName="description" [invalid]="false" [options]="options" name="description"></app-auto-complete>
    </form>
  `
})
class TestComponent {

  form: FormGroup;

  options = [ 'Option 1', 'Option 2', 'Option 3' ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      description: ['']
    });
  }
}

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteComponent, TestComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);

    component = fixture.componentInstance;
    component.name = 'description';
    component.invalid = false;
    component.options = [ 'Option 1', 'Option 2', 'Option 3' ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name and invalid value', () => {
    component.invalid = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');

    expect(input.id).toBe('description');
    expect(input.classList.contains('is-invalid')).toBe(true);
  });

  it('should display list of options', () => {
    fixture.detectChanges();

    const options = [];
    fixture.nativeElement.querySelectorAll('.dropdown li')
      .forEach(option => {
        options.push(option.textContent.trim());
      });

    expect(options).toEqual(component.options);
  });

  it('should display dropdown on focus input and hide on blur', () => {
    const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();

    const input = testFixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focus'));

    testFixture.detectChanges();

    const dropdown = testFixture.nativeElement.querySelector('.dropdown');
    expect(dropdown.classList.contains('open')).toBe(true);

    input.dispatchEvent(new Event('blur'));

    testFixture.detectChanges();

    expect(dropdown.classList.contains('open')).toBe(false);
  });

  it('should select option on click', () => {
    const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();

    const firstOption = testFixture.nativeElement.querySelectorAll('.dropdown li').item(0);
    firstOption.dispatchEvent(new Event('mousedown'));

    const formControlValue = testFixture.componentInstance.form.get('description').value;

    expect(formControlValue).toBe(testFixture.componentInstance.options[0]);
  });

  it('should select option when type enter', () => {
    const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();

    const input = testFixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focus'));

    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' }));

    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));

    testFixture.detectChanges();

    const formControlValue = testFixture.componentInstance.form.get('description').value;

    expect(formControlValue).toBe(testFixture.componentInstance.options[1]);
  });
});
