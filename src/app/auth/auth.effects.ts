import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginError, LoginRequested, LoginSucceed } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';


@Injectable()
export class AuthEffects {

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

  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private alert: AlertService) {}
}
