import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../tokens';
import LoginResponse from '../models/login-response.model';

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

}
