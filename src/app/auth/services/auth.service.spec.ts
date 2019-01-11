import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_API_URL } from '../../../tokens';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BASE_API_URL, useValue: 'http://api.com' }
      ],
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http request on login', () => {
    const data = {
      email: 'admin@admin.com',
      password: 'admin'
    };

    service.login(data.email, data.password).subscribe();

    const req = http.expectOne('http://api.com/v1/auth/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
  });

  it('should make a http request on register', () => {
    const data = {
      name: 'User Name',
      email: 'email@email.com',
      password: 'pass',
      admin: true
    };

    service.register(data).subscribe();

    const req = http.expectOne('http://api.com/v1/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
  });

  it('should make a http request on checkUniqueEmail', () => {
    const email = 'admin@admin.com';

    service.checkUniqueEmail(email).subscribe();

    const req = http.expectOne(`http://api.com/v1/auth/unique-email?email=${email}`);
    expect(req.request.method).toBe('GET');
  });
});
