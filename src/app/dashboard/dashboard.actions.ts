import { Action } from '@ngrx/store';
import Purchase from './models/purchase.model';

export enum DashboardActionTypes {
  RequestedPurchasesAction = '[Dashboard Page] Requested Purchases Action',
  FetchPurchasesAction = '[Dashboard Page] Fetch Purchases Action',
  ChangeSelectedMonthAction = '[Dashboard Page] Change Selected Month Action',
  CreatePurchaseAction = '[Purchase Modal] Create Purchase Action',
  UpdatePurchaseAction = '[Purchase Modal] Update Purchase Action',
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

export class CreatePurchase implements Action {
  readonly type = DashboardActionTypes.CreatePurchaseAction;

  constructor(public payload: { purchase: Purchase }) {}
}

export class UpdatePurchase implements Action {
  readonly type = DashboardActionTypes.UpdatePurchaseAction;

  constructor(public payload: { purchase: Purchase }) {}
}

export type DashboardActions = RequestedPurchases | FetchPurchases | ChangeSelectedMonth | CreatePurchase | UpdatePurchase;
