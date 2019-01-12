import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { Injectable } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { AppState } from '../../reducers';
import { LoginSucceed, Logout } from '../auth.actions';
import { Router } from '@angular/router';

@Injectable()
class TestService {
  constructor(private http: HttpClient) {}

  public normal() {
    return this.http.get('http://api.com/users');
  }

  public auth() {
    return this.http.get('http://api.com/auth/login');
  }
}

describe('AuthInterceptor', () => {

  let testService: TestService;
  let http: HttpTestingController;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        TestService
      ]
    });

    testService = TestBed.get(TestService);
    http = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
    router = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);

    store.dispatch(new LoginSucceed({ token: 'token', user: { name: 'user' }}));
  });

  afterEach(() => {
    http.verify();
  });

  it('should add authorization header on non auth requests', () => {
    testService.normal().subscribe();

    const req = http.expectOne('http://api.com/users');

    expect(req.request.headers.has('Authorization')).toBe(true);
  });

  it('should logout when request return status 401', () => {
    spyOn(store, 'dispatch');

    testService.normal().subscribe(() => {}, () => {});

    const req = http.expectOne('http://api.com/users');
    req.flush('', { status: 401, statusText: 'Unauthorized' });

    expect(store.dispatch).toHaveBeenCalledWith(new Logout({ error: 'Efetue login para continuar' }));
  });
});
