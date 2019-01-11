import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from '../../services/dialog.service';
import Dialog from '../../models/dialog.model';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CloseModalDirective } from '../../../shared/components/modal/close-modal.directive';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  const dialogServiceMock = {
    data$: new Subject<Dialog>()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent, ModalComponent, CloseModalDirective ],
      providers: [
        { provide: DialogService, useValue: dialogServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display modal with title and message when receive data from observable', () => {
    spyOn(component.modal, 'show');

    const data: Dialog = {
      title: 'Title',
      message: 'Message',
      success: () => {}
    };

    dialogServiceMock.data$.next(data);

    expect(component.modal.show).toHaveBeenCalled();

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.modal-title').textContent;
    const message = fixture.nativeElement.querySelector('.modal-body span').textContent;

    expect(title).toBe(data.title);
    expect(message).toBe(data.message);
  });

  it('should call success function when `Yes` button was clicked', fakeAsync(() => {
    const data: Dialog = {
      title: 'Title',
      message: 'Message',
      success: jasmine.createSpy('success')
    };

    dialogServiceMock.data$.next(data);

    tick(1000);

    fixture.detectChanges();

    const yesButton = fixture.nativeElement.querySelector('#yes');
    yesButton.click();

    tick(1000);

    expect(data.success).toHaveBeenCalled();
  }));
});
