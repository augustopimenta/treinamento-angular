import * as fromDashboard from './dashboard.selectors';
import { initialState } from './dashboard.reducer';
import Purchase from './models/purchase.model';

describe('Dashboard selectors', () => {
  it('selectDashboardState', () => {
    expect(fromDashboard.selectDashboardState.projector({ ...initialState })).toEqual(initialState);
  });

  it('selectDashboardLoading', () => {
    expect(fromDashboard.selectDashboardLoading.projector({ ...initialState, loading: true })).toBe(true);
  });

  it('selectDashboardTotals', () => {
    const purchases: Purchase[] = [
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
    ];

    const expected = {
      total: 20, pending: 10
    };

    expect(fromDashboard.selectDashboardTotals.projector({ ...initialState, purchases })).toEqual(expected);
  });

  it('selectDashboardSelectedMonth', () => {
    expect(fromDashboard.selectDashboardSelectedMonth.projector({ ...initialState, selectedMonthIndex: 1 })).toBe(1);
  });

  it('selectDashboardMonthGroups', () => {
    const purchases: Purchase[] = [
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
    ];

    const expected = [
      { date: new Date(2019, 0, 1), total: 20, pending: 10 },
      { date: new Date(2018, 11, 1), total: 0, pending: 0 },
      { date: new Date(2018, 10, 1), total: 0, pending: 0 },
      { date: new Date(2018, 9, 1), total: 0, pending: 0 },
    ];

    const today = new Date(2019, 0, 3);

    expect(fromDashboard.selectDashboardMonthGroups(today).projector( {...initialState, purchases})).toEqual(expected);
  });

  it('selectDashboardSelectedPurchases', () => {
    const purchases: Purchase[] = [
      {id: '3', description: 'd', date: '2018-12-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
      {id: '5', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '4', description: 'd', date: '2019-01-03', total: 10, quantity: 5, value: 2, paid: false },
    ];

    const expected: Purchase[] = [
      {id: '4', description: 'd', date: '2019-01-03', total: 10, quantity: 5, value: 2, paid: false },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
      {id: '5', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
    ];

    const groups = [
      { date: new Date(2019, 0, 1), total: 0, pending: 0 },
      { date: new Date(2018, 11, 1), total: 0, pending: 0 },
      { date: new Date(2018, 10, 1), total: 0, pending: 0 },
      { date: new Date(2018, 9, 1), total: 0, pending: 0 },
    ];

    const today = new Date(2019, 0, 3);

    const result = fromDashboard.selectDashboardSelectedPurchases(today).projector( {...initialState, purchases}, groups);

    expect(result).toEqual(expected);
  });
});
