import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectAuthAuthenticated } from '../auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectAuthAuthenticated),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('/entrar');
        }
      })
    );
  }

  constructor(private store: Store<AppState>, private router: Router) {}

}
