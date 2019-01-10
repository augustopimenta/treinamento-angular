import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export const selectAuthUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectAuthToken = createSelector(
  selectAuthState,
  state => state.authToken
);

export const selectAuthAuthenticated = createSelector(
  selectAuthState,
  state => state.authenticated
);
