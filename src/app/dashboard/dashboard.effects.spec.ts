import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject } from 'rxjs';

import { DashboardEffects } from './dashboard.effects';
import { DashboardActions, FetchPurchases, RequestedPurchases } from './dashboard.actions';
import Purchase from './models/purchase.model';
import { PurchasesService } from './services/purchases.service';

describe('DashboardEffects', () => {
  let actions$: ReplaySubject<DashboardActions>;
  let effects: DashboardEffects;
  let purchasesService: PurchasesService;

  beforeEach(() => {
    purchasesService = jasmine.createSpyObj('PurchasesService', ['all']);

    TestBed.configureTestingModule({
      providers: [
        DashboardEffects,
        provideMockActions(() => actions$),
        { provide: PurchasesService, useValue: purchasesService }
      ]
    });

    effects = TestBed.get(DashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch FetchPurchases action on RequestedPurchases action', () => {
    const purchases: Purchase[] = [
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
    ];

    (purchasesService.all as jasmine.Spy).and.returnValue(of(purchases));

    actions$ = new ReplaySubject(1);
    actions$.next(new RequestedPurchases());

    effects.requestedPurchases$.subscribe(action => {
      expect(action).toEqual(new FetchPurchases({ purchases }));
    });
  });
});
