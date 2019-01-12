import * as fromAuth from './auth.selectors';
import { initialState } from './auth.reducer';

describe('Auth selectors', () => {
  it('selectAuthState', () => {
    expect(fromAuth.selectAuthState.projector({ ...initialState })).toEqual(initialState);
  });

  it('selectAuthAuthenticated', () => {
    expect(fromAuth.selectAuthAuthenticated.projector({ ...initialState, authenticated: true })).toBe(true);
  });

  it('selectAuthLoading', () => {
    expect(fromAuth.selectAuthLoading.projector({ ...initialState, loading: true })).toBe(true);
  });

  it('selectAuthUser', () => {
    expect(fromAuth.selectAuthUser.projector({ ...initialState, user: { name: 'name' } })).toEqual({ name: 'name' });
  });

  it('selectAuthToken', () => {
    expect(fromAuth.selectAuthToken.projector({ ...initialState, authToken: 'token' })).toBe('token');
  });
});
