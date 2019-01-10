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

export const selectDashboardSelectedMonth = createSelector(
  selectDashboardState,
  state => state.selectedMonthIndex
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

export const selectDashboardMonthGroups = (start: Date) => {
  return createSelector(
    selectDashboardState,
    state => {
      const groups = [];
      const date = moment(start).startOf('month');

      Array.from(new Array(4)).forEach(() => {
        const purchases = state.purchases.filter(purchase =>
          moment(purchase.date).startOf('month').isSame(date)
        );

        const totals = sumPurchases(purchases);

        groups.push({
          date: date.toDate(), total: totals.total, pending: totals.pending
        });

        date.subtract(1, 'months');
      });

      return groups;
    }
  );
};

export const selectDashboardSelectedPurchases = (start: Date) => {
  return createSelector(
    selectDashboardState,
    selectDashboardMonthGroups(start),
    (state, months) => {
      const date = moment(months[state.selectedMonthIndex].date);
      return state.purchases
        .filter(purchase => moment(purchase.date).startOf('month').isSame(date))
        .sort((p1, p2) => {
          const p1Date = moment(p1.date);
          const p2Date = moment(p2.date);

          if (p1Date.isBefore(p2Date)) {
            return 1;
          }

          if (p1Date.isAfter(p2Date)) {
            return -1;
          }

          return 0;
        });
    }
  );
};
