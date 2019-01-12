import { reducer, initialState } from './dashboard.reducer';
import {
  ChangeSelectedMonth,
  CreatePurchase,
  DeletePurchase,
  FetchPurchases,
  RequestedPurchases,
  UpdatePurchase
} from './dashboard.actions';
import Purchase from './models/purchase.model';

describe('Dashboard reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('RequestedPurchases action', () => {
    it('should set loading to true', () => {
      const result = reducer(initialState, new RequestedPurchases());

      expect(result).toEqual({ ...initialState, loading: true });
    });
  });

  describe('FetchPurchases action', () => {
    const purchases: Purchase[] = [
      {id: '1', description: 'd', date: '2019-01-01', total: 10, quantity: 5, value: 2, paid: true },
      {id: '2', description: 'd', date: '2019-01-02', total: 10, quantity: 5, value: 2, paid: false },
    ];

    it('should fill purchases', () => {
      const result = reducer(initialState, new FetchPurchases({ purchases }));

      expect(result).toEqual({ ...initialState, purchases });
    });
  });

  describe('CreatePurchase action', () => {
    const purchase: Purchase = {
      id: '1',
      description: 'd',
      date: '2019-01-01',
      total: 10,
      quantity: 5,
      value: 2,
      paid: true
    };

    it('should add new purchase', () => {
      const result = reducer(initialState, new CreatePurchase({ purchase }));

      expect(result).toEqual({ ...initialState, purchases: [ purchase ] });
    });
  });

  describe('UpdatePurchase action', () => {
    const purchase: Purchase = {
      id: '1',
      description: 'd',
      date: '2019-01-01',
      total: 10,
      quantity: 5,
      value: 2,
      paid: true
    };

    it('should update an existent purchase', () => {
      const action = new UpdatePurchase({ purchase: { ...purchase, description: 'ddd' } });

      const result = reducer({ ...initialState, purchases: [ purchase ] }, action);

      expect(result).toEqual({ ...initialState, purchases: [ { ...purchase, description: 'ddd' } ] });
    });
  });

  describe('DeletePurchase action', () => {
    const purchase: Purchase = {
      id: '1',
      description: 'd',
      date: '2019-01-01',
      total: 10,
      quantity: 5,
      value: 2,
      paid: true
    };

    it('should delete an existent purchase', () => {
      const result = reducer({ ...initialState, purchases: [ purchase ] }, new DeletePurchase({ id: purchase.id }));

      expect(result).toEqual({ ...initialState, purchases: [ ] });
    });
  });

  describe('ChangeSelectedMonth action', () => {
    it('should change selected month index', () => {
      const index = 2;

      const result = reducer(initialState, new ChangeSelectedMonth({index}));

      expect(result).toEqual({ ...initialState, selectedMonthIndex: index });
    });
  });
});
