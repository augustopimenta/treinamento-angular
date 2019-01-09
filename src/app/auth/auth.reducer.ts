import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  authToken: string;
  user: { name: string };
}

export const initialState: AuthState = {
  loading: false,
  authenticated: false,
  authToken: '',
  user: { name: '' }
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginRequestedAction:
      return { ...state, loading: true };
    case AuthActionTypes.LoginSucceedAction:
      return { ...state, loading: false, authenticated: true, authToken: action.payload.token, user: action.payload.user };
    case AuthActionTypes.LoginErrorAction:
      return { ...state, loading: false, authenticated: false };
    default:
      return state;
  }
}
