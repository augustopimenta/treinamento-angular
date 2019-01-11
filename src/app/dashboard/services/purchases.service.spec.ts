import { TestBed } from '@angular/core/testing';

import { PurchasesService } from './purchases.service';
import Purchase from '../models/purchase.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_API_URL } from '../../../tokens';

describe('PurchasesService', () => {
  const purchase: Purchase = {
    id: '1',
    description: 'Description',
    quantity: 10,
    date: '2019-01-10',
    paid: true,
    value: 1,
    total: 10
  };

  let service: PurchasesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BASE_API_URL, useValue: 'http://api.com' }
      ],
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(PurchasesService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http request on search', () => {
    const description = 'description';

    service.search(description).subscribe();

    const req = http.expectOne(`http://api.com/v1/purchases?search=1&description=${description}`);
    expect(req.request.method).toBe('GET');
  });

  it('should make a http request on all', () => {
    service.all().subscribe();

    const req = http.expectOne('http://api.com/v1/purchases');
    expect(req.request.method).toBe('GET');
  });

  it('should make a http request on create', () => {
    service.create(purchase).subscribe();

    const req = http.expectOne('http://api.com/v1/purchases');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(purchase);
  });

  it('should make a http request on update', () => {
    service.update(purchase).subscribe();

    const req = http.expectOne(`http://api.com/v1/purchases/${purchase.id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(purchase);
  });

  it('should make a http request on delete', () => {
    service.delete(purchase.id).subscribe();

    const req = http.expectOne(`http://api.com/v1/purchases/${purchase.id}`);
    expect(req.request.method).toBe('DELETE');
  });
});
