import { reducer, initialState } from './auth.reducer';
import { AuthActionTypes, LoginError, LoginRequested, LoginSucceed, Logout, RegisterFinish, RegisterStarted } from './auth.actions';
import User from './models/user.model';

describe('Auth reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LoginRequested action', () => {
    it('should set loading to true', () => {
      const result = reducer(initialState, new LoginRequested({ email: '', password: '' }));

      expect(result).toEqual({ ...initialState, loading: true });
    });
  });

  describe('LoginSucceed action', () => {
    it('should set token, user info and authenticated', () => {
      const data = {token: 'token', user: { name: 'User' }};

      const result = reducer(initialState, new LoginSucceed(data));

      expect(result).toEqual({ ...initialState, authenticated: true, authToken: data.token, user: data.user });
    });
  });

  describe('LoginError action', () => {
    it('should set authenticated and loading to false', () => {
      const result = reducer(initialState, new LoginError({ error: '' }));

      expect(result).toEqual({ ...initialState, authenticated: false, loading: false });
    });
  });

  describe('RegisterStarted action', () => {
    it('should set loading to true', () => {
      const user: User = {
        name: 'Name',
        email: 'name@email.com',
        password: 'password',
        admin: true
      };
      const result = reducer(initialState, new RegisterStarted({ user }));

      expect(result).toEqual( { ...initialState, loading: true });
    });
  });

  describe('RegisterFinish action', () => {
    it('should set loading to false', () => {
      const result = reducer(initialState, new RegisterFinish());

      expect(result).toEqual( { ...initialState });
    });
  });

  describe('Logout action', () => {
    it('should set state to initialState', () => {
      const result = reducer(initialState, new Logout({ error: '' }));

      expect(result).toEqual(initialState);
    });
  });
});
