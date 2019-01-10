import { Action } from '@ngrx/store';
import Purchase from './models/purchase.model';

export enum DashboardActionTypes {
  RequestedPurchasesAction = '[Dashboard Page] Requested Purchases Action',
  FetchPurchasesAction = '[Dashboard Page] Fetch Purchases Action',
  ChangeSelectedMonthAction = '[Dashboard Page] Change Selected Month Action',
}

export class RequestedPurchases implements Action {
  readonly type = DashboardActionTypes.RequestedPurchasesAction;
}

export class FetchPurchases implements Action {
  readonly type = DashboardActionTypes.FetchPurchasesAction;

  constructor(public payload: { purchases: Purchase[] }) {}
}

export class ChangeSelectedMonth implements Action {
  readonly type = DashboardActionTypes.ChangeSelectedMonthAction;

  constructor(public payload: { index: number }) {}
}

export type DashboardActions = RequestedPurchases | FetchPurchases | ChangeSelectedMonth;
