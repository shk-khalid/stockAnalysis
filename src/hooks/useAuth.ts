import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './useRedux';
import { login, register, logout } from './slices/authSlice';
import { getCurrentUser } from '../lib/authUtils';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, tokens } = useSelector((state: RootState) => state.auth);

  // If the Redux state doesn't have a user, try to get it from the token.
  const currentUser = user || getCurrentUser();

  return {
    user: currentUser,
    loading,
    error,
    isAuthenticated: !!tokens,
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    register: (email: string, password: string, name: string) =>
      dispatch(register({ email, password, name })),
    logout: () => dispatch(logout()),
  };
}
