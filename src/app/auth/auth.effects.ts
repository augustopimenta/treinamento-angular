import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginError, LoginRequested, LoginSucceed, Logout } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { defer, of } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';

@Injectable()
export class AuthEffects {

  @Effect()
  init$ = defer(() => {
    const token = localStorage.getItem('auth.token');
    const user = localStorage.getItem('auth.user');

    if (token && user) {
      return of(new LoginSucceed({
        token,
        user: JSON.parse(user)
      }));
    }

    return <any>of(new Logout({ error: '' }));
  });

  @Effect()
  loginRequested$ = this.actions$.pipe(
    ofType<LoginRequested>(AuthActionTypes.LoginRequestedAction),
    switchMap(action => this.authService.login(action.payload.email, action.payload.password).pipe(
      catchError(data => {
        let error = '';
        if (data.status > 0 && data.error) {
          error = data.error.error;
        } else {
          error = 'Não foi possivel autenticar, um erro ocerreu!';
        }

        return of({ error });
      })
    )),
    map((data: any) => {
      if (!data.error) {
        const token = data.auth_token;
        const user = data.user;

        this.router.navigateByUrl('/inicio');

        return new LoginSucceed({
          token,
          user: { name: user.name }
        });
      } else {
        return new LoginError({
          error: data.error
        });
      }
    })
  );

  @Effect({ dispatch: false })
  loginSucceed$ = this.actions$.pipe(
    ofType<LoginSucceed>(AuthActionTypes.LoginSucceedAction),
    tap(action => {
      localStorage.setItem('auth.token', action.payload.token);
      localStorage.setItem('auth.user', JSON.stringify(action.payload.user));
    })
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType<LoginError>(AuthActionTypes.LoginErrorAction),
    tap(action => {
      this.alert.error(action.payload.error, 5000);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('auth.token');
      localStorage.removeItem('auth.user');

      if (action.payload.error) {
        this.alert.error(action.payload.error, 5000);
      }

      this.router.navigateByUrl('/entrar');
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService) {}
}
