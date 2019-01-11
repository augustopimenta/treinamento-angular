import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import ModalSize from './modal-size.enum';
import { CloseModalDirective } from './close-modal.directive';
import { Component } from '@angular/core';

import 'bootstrap';

@Component({
  selector: 'app-test',
  template: `
    <app-modal header="Title">
      <div class="content">Content</div>
      <button appCloseModal footer>Close</button>
    </app-modal>
  `
})
class TestComponent { }

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent, TestComponent, CloseModalDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.header = 'Title';
    component.size = ModalSize.MEDIUM;
    component.closeable = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and size values', () => {
    const title = fixture.nativeElement.querySelector('.modal-title');
    expect(title.textContent).toBe(component.header);

    const classes = fixture.nativeElement.querySelector('.modal-dialog').classList;
    expect(classes).toContain(component.size);
  });

  it('should show the modal on call show method', fakeAsync(() => {
    component.show();
    tick(1000);

    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal.classList).toContain('show');

    component.hide();
    tick(1000);
  }));

  it('should hide the modal on call hide method', fakeAsync(() => {
    component.show();
    tick(1000);

    component.hide();
    tick(1000);

    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal.classList).not.toContain('show');
  }));

  it('should be close on click times button if closeable is true', () => {
    spyOn(component, 'hide');

    const button = fixture.nativeElement.querySelector('.modal-header button');
    button.click();

    expect(component.hide).toHaveBeenCalled();
  });

  it('should display inner content with projection', () => {
    const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);

    const content = testFixture.nativeElement.querySelector('.modal-body .content');
    expect(content).toBeTruthy();

    const footer = testFixture.nativeElement.querySelector('.modal-footer button');
    expect(footer).toBeTruthy();
  });

  it('should emit events on finished close or open the modal', fakeAsync(() => {
    spyOn(component.openFinished, 'emit');
    spyOn(component.closeFinished, 'emit');

    component.show();

    tick(1000);
    expect(component.openFinished.emit).toHaveBeenCalled();

    component.hide();

    tick(1000);
    expect(component.closeFinished.emit).toHaveBeenCalled();
  }));

  it('should hide modal on click elements with appCloseModal directive', () => {
    spyOn(ModalComponent.prototype, 'hide');

    const testFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();

    const element = testFixture.nativeElement.querySelector('[appCloseModal]');
    element.click();

    expect(component.hide).toHaveBeenCalled();
  });
});
