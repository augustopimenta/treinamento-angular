import { DashboardActions } from './dashboard.actions';

export interface DashboardState {

}

export const initialState: DashboardState = {

};

export function reducer(state = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {

    default:
      return state;
  }
}
