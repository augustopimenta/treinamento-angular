import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import Dialog from '../models/dialog.model';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(DialogService);
  });

  it('should  created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a Dialog data on call confirm method', () => {
    const data: Dialog = {
      title: 'Title',
      message: 'Message',
      success: () => {}
    };

    let emittedData = null;
    service.data$.subscribe(dialog => emittedData = dialog);

    service.confirm(data.title, data.message, data.success);

    expect(emittedData).toEqual(data);
  });
});
