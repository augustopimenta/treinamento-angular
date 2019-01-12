import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAuthToken } from '../auth.selectors';
import { catchError } from 'rxjs/operators';
import { Logout } from '../auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  authToken: string;

  constructor(private store: Store<AppState>) {
    store.pipe(select(selectAuthToken)).subscribe(token => {
      this.authToken = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth/')) {
      let request: Observable<HttpEvent<any>>;
      if (this.authToken) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${this.authToken}` }
        });
        request = next.handle(authReq);
      } else {
        request = next.handle(req);
      }

      return request.pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            this.store.dispatch(new Logout({ error: 'Efetue login para continuar' }));
          }
          return throwError(errorResponse);
        })
      );
    }

    return next.handle(req);
  }

}
