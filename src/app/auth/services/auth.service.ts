import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../tokens';
import LoginResponse from '../models/login-response.model';
import RegisterResponse from '../models/register-response.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseApiUrl: string) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseApiUrl}/v1/auth/login`, { email, password });
  }

  checkUniqueEmail(email: string) {
    return this.http.get<boolean>(`${this.baseApiUrl}/v1/auth/unique-email`, { params: { email } });
  }

  register(user: User) {
    return this.http.post<RegisterResponse>(`${this.baseApiUrl}/v1/auth/register`, user);
  }

}
