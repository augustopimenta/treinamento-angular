import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { AppState } from '../../reducers';
import { LoginSucceed } from '../auth.actions';

describe('AuthGuard', () => {
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        AuthGuard
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    });
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should redirect when not authenticated', inject([AuthGuard], (guard: AuthGuard) => {
    let result = null;
    guard.canActivate().subscribe(r => result = r);

    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');
  }));

  it('should do nothing when authenticated', inject([AuthGuard], (guard: AuthGuard) => {
    const store: Store<AppState> = TestBed.get(Store);
    store.dispatch(new LoginSucceed({ token: 'token', user: { name: 'Fulano' } }));

    let result = null;
    guard.canActivate().subscribe(r => result = r);

    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  }));
});
