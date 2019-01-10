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

    default:
      return state;
  }
}
