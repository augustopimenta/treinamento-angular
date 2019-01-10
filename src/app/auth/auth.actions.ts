import { Action } from '@ngrx/store';
import User from './models/user.model';

export enum AuthActionTypes {
  LoginRequestedAction = '[Login Page] Login Requested Action',
  LoginSucceedAction = '[Login Page] Login Succeed Action',
  LoginErrorAction = '[Login Page] Login Error Action',
  RegisterStartedAction = '[Register Page] Register Started Action',
  RegisterFinishAction = '[Register Page] Register Finish Action',
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

export class RegisterStarted implements Action {
  readonly type = AuthActionTypes.RegisterStartedAction;

  constructor(public payload: { user: User }) {}
}

export class RegisterFinish implements Action {
  readonly type = AuthActionTypes.RegisterFinishAction;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload: { error: string }) { }
}

export type AuthActions = LoginRequested | LoginSucceed | LoginError | RegisterStarted | RegisterFinish | Logout;
