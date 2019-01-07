import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../tokens';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseApiUrl: string) { }

  search(description: string) {
    return this.http.get<string[]>(`${this.baseApiUrl}/v1/purchases`, {
      params: { search: '1', description },
      headers: { 'Authorization': `Bearer 041158aabfd998f0aa4e9dba1b4df2a6f34887b9d685c80422eac76a2524f091` }
    });
  }

}
