import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertService } from './alert.service';
import AlertType from '../enums/alert-type.enum';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(AlertService);
  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });

  it('should call hide after delay time', fakeAsync(() => {
    spyOn(service, 'hide');

    service.success('message', 1000);

    expect(service.hide).not.toHaveBeenCalled();

    tick(1000);

    expect(service.hide).toHaveBeenCalled();
  }));

  it('should emit Alert when call success or error functions', () => {
    let emittedData = null;
    service.data$.subscribe(alert => emittedData = alert);

    service.error('message');

    expect(emittedData).toEqual({ open: true, type: AlertType.ERROR, message: 'message' });
  });

  it('should emit Alert on call hide method', () => {
    service.error('message');

    let emittedData = null;
    service.data$.subscribe(alert => emittedData = alert);

    expect(emittedData).toEqual({ open: true, type: AlertType.ERROR, message: 'message' });

    service.hide();

    expect(emittedData).toEqual({ open: false, type: AlertType.ERROR, message: 'message' });
  });
});
