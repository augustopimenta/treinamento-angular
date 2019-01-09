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
