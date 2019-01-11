import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import Alert from '../../models/alert.model';
import { BehaviorSubject } from 'rxjs';
import AlertType from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  const alertServiceMock = {
    data$: new BehaviorSubject<Alert>({
      open: false,
      type: AlertType.SUCCESS,
      message: ''
    }),
    hide: jasmine.createSpy('hide')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [
        { provide: AlertService, useValue: alertServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alert when receive data from observable', () => {
    alertServiceMock.data$.next({
      open: true,
      type: AlertType.SUCCESS,
      message: 'Message'
    });

    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');

    expect(alert.classList.contains('show')).toBe(true);
    expect(alert.classList.contains('alert-success')).toBe(true);
    expect(alert.textContent).toContain('Message');
  });

  it('should call service hide on click close button', () => {
    const button = fixture.nativeElement.querySelector('.close');
    button.click();

    expect(alertServiceMock.hide).toHaveBeenCalled();
  });
});
