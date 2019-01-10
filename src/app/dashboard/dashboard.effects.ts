import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DashboardActionTypes, FetchPurchases, RequestedPurchases } from './dashboard.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchasesService } from './services/purchases.service';
import { of } from 'rxjs';

@Injectable()
export class DashboardEffects {

  @Effect()
  requestedPurchases$ = this.actions$.pipe(
    ofType<RequestedPurchases>(DashboardActionTypes.RequestedPurchasesAction),
    switchMap(() => this.purchasesService.all().pipe(
      catchError(() => of([]))
    )),
    map(purchases => new FetchPurchases({ purchases }))
  );

  constructor(private actions$: Actions, private purchasesService: PurchasesService) {}
}
