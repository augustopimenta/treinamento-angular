import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, Subject, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthActions, LoginError, LoginRequested, LoginSucceed, Logout, RegisterFinish, RegisterStarted } from './auth.actions';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';
import LoginResponse from './models/login-response.model';
import User from './models/user.model';

describe('AuthEffects', () => {
  let actions$: Subject<AuthActions>;
  let effects: AuthEffects;
  let router: Router;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);
    authService = jasmine.createSpyObj('AuthService', [ 'login', 'register' ]);
    alertService = jasmine.createSpyObj('AlertService', [ 'success', 'error' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
        { provide: AlertService, useValue: alertService },
        AuthEffects,
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch Logout action if without login data on localStorage', () => {
    localStorage.clear();

    effects.init$.subscribe(action => {
      expect(action).toEqual(new Logout({ error: '' }));
    });
  });

  it('should dispatch Login action if have login data on localStorage', () => {
    localStorage.clear();

    const data = {
      token: 'token',
      user: { name: 'nome' }
    };

    localStorage.setItem('auth.token', data.token);
    localStorage.setItem('auth.user', JSON.stringify(data.user));

    effects.init$.subscribe(action => {
      expect(action).toEqual(new LoginSucceed(data));
    });
  });

  it('should save data on localStorage on LoginSucceed action', () => {
    localStorage.clear();

    const data = {
      token: 'token',
      user: { name: 'nome' }
    };

    actions$ = new ReplaySubject(1);
    actions$.next(new LoginSucceed(data));

    effects.loginSucceed$.subscribe(() => {
      expect(localStorage.getItem('auth.token')).toEqual(data.token);
      expect(localStorage.getItem('auth.user')).toEqual(JSON.stringify(data.user));
    });
  });

  it('should display error on LoginError action', () => {
    const errorMessage = 'Error message';

    actions$ = new ReplaySubject(1);
    actions$.next(new LoginError({ error: errorMessage }));

    effects.loginError$.subscribe(() => {
      expect(alertService.error).toHaveBeenCalledWith(errorMessage, 5000);
    });
  });

  it('should clear data and navigate to login route on Logout action', () => {
    localStorage.clear();

    const errorMessage = 'Error message';

    localStorage.setItem('auth.token', 'token');
    localStorage.setItem('auth.user', 'data');

    actions$ = new ReplaySubject(1);
    actions$.next(new Logout({ error: errorMessage }));

    effects.logout$.subscribe(() => {
      expect(localStorage.getItem('auth.token')).toBeNull();
      expect(localStorage.getItem('auth.user')).toBeNull();

      expect(alertService.error).toHaveBeenCalledWith(errorMessage, 5000);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');
    });
  });

  it('should dispatch LoginSucceed action on LoginRequested action with successful request', () => {
    const data: LoginResponse = {
      user: { id: '1', name: 'name', email: 'email@email.com', admin: true },
      auth_token: 'token'
    };

    (authService.login as jasmine.Spy).and.returnValue(of(data));

    actions$ = new ReplaySubject(1);
    actions$.next(new LoginRequested({ email: data.user.email, password: 'password' }));

    effects.loginRequested$.subscribe(action => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio');

      expect(action).toEqual(new LoginSucceed({ token: data.auth_token, user: { name: data.user.name } }));
    });
  });

  it('should dispatch LoginError action on LoginRequested action with error request', () => {
    const data =  {
      error: { error: 'error' }
    };

    (authService.login as jasmine.Spy).and.returnValue(throwError({ status: 500, error: data.error }));

    actions$ = new ReplaySubject(1);
    actions$.next(new LoginRequested({ email: 'email@email.com', password: 'password' }));

    effects.loginRequested$.subscribe(action => {
      expect(router.navigateByUrl).not.toHaveBeenCalled();

      expect(action).toEqual(new LoginError( { error: data.error.error }));
    });
  });

  it('should display alert, redirect and dispatch RegisterFinish action on RegisterStarted action', () => {
    const user: User = {
      name: 'User name',
      email: 'user@email.com',
      password: 'password',
      admin: true
    };

    (authService.register as jasmine.Spy).and.returnValue(of({}));

    actions$ = new ReplaySubject(1);
    actions$.next(new RegisterStarted({ user }));

    effects.register$.subscribe(action => {
      expect(alertService.success).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');

      expect(action).toEqual(new RegisterFinish());
    });
  });

  it('should display alert and dispatch RegisterFinish action on RegisterStarted action', () => {
    const user: User = {
      name: 'User name',
      email: 'user@email.com',
      password: 'password',
      admin: true
    };

    (authService.register as jasmine.Spy).and.returnValue(throwError({}));

    actions$ = new ReplaySubject(1);
    actions$.next(new RegisterStarted({ user }));

    effects.register$.subscribe(action => {
      expect(alertService.error).toHaveBeenCalled();

      expect(action).toEqual(new RegisterFinish());
    });
  });
});
