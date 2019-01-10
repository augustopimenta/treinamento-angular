import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import Purchase from './models/purchase.model';
const moment = require('moment');

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  state => state.loading
);

export const selectDashboardTotals = createSelector(
  selectDashboardState,
  state => sumPurchases(state.purchases)
);

const sumPurchases = (purchases: Purchase[]) => {
  return purchases.reduce((totals, purchase) => {
    const purchaseTotal = purchase.value * purchase.quantity;

    return {
      ...totals,
      total: totals.total + purchaseTotal,
      pending: !purchase.paid ? totals.pending + purchaseTotal : totals.pending
    };
  }, { total: 0, pending: 0 });
};

