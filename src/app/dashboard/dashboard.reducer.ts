import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import Purchase from './models/purchase.model';

export interface DashboardState {
  loading: boolean;
  selectedMonthIndex: number;
  purchases: Purchase[];
}

export const initialState: DashboardState = {
  loading: false,
  selectedMonthIndex: 0,
  purchases: []
};

export function reducer(state = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {
    case DashboardActionTypes.RequestedPurchasesAction:
      return { ...state, loading: true };

    case DashboardActionTypes.FetchPurchasesAction:
      return { ...state, loading: false, purchases: action.payload.purchases, selectedMonthIndex: 0 };

    case DashboardActionTypes.ChangeSelectedMonthAction:
      return { ...state, selectedMonthIndex: action.payload.index };

    case DashboardActionTypes.CreatePurchaseAction:
      return { ...state, purchases: [ ...state.purchases, action.payload.purchase ] };

    case DashboardActionTypes.UpdatePurchaseAction:
      const purchaseIndex = state.purchases.findIndex(purchase => purchase.id === action.payload.purchase.id);
      return {
        ...state,
        purchases: [
          ...state.purchases.slice(0, purchaseIndex),
          { ...state.purchases[purchaseIndex], ...action.payload.purchase },
          ...state.purchases.slice(purchaseIndex + 1)
        ]
      };

    case DashboardActionTypes.DeletePurchaseAction:
      return { ...state, purchases: state.purchases.filter(purchase => purchase.id !== action.payload.id) };

    default:
      return state;
  }
}
