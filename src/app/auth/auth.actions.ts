import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginRequestedAction = '[Login Page] Login Requested Action',
  LoginSucceedAction = '[Login Page] Login Succeed Action',
  LoginErrorAction = '[Login Page] Login Error Action',
  LogoutAction = '[Dashboard Home Page] Logout Action'
}

export class LoginRequested implements Action {
  readonly type = AuthActionTypes.LoginRequestedAction;

  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSucceed implements Action {
  readonly type = AuthActionTypes.LoginSucceedAction;

  constructor(public payload: { token: string, user: { name: string }}) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginErrorAction;

  constructor(public payload: { error: string }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload: { error: string }) { }
}

export type AuthActions = LoginRequested | LoginSucceed | LoginError | Logout;
