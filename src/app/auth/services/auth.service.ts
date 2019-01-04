import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkUniqueEmail(email: string) {
    return this.http.get<boolean>('http://localhost:8080/v1/auth/unique-email', { params: { email } });
  }

}
