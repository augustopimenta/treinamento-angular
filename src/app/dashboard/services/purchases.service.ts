import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../tokens';
import Purchase from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseApiUrl: string) { }

  search(description: string) {
    return this.http.get<string[]>(`${this.baseApiUrl}/v1/purchases`, {
      params: { search: '1', description }
    });
  }

  all() {
    return this.http.get<Purchase[]>(`${this.baseApiUrl}/v1/purchases`);
  }

}
