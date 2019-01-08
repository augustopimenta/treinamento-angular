import { Action } from '@ngrx/store';


export interface AuthState {

}

export const initialState: AuthState = {

};

export function reducer(state = initialState, action: Action): AuthState {
  switch (action.type) {

    default:
      return state;
  }
}
