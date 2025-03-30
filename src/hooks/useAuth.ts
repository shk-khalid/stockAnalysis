import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './useRedux';
import { login, register, logout } from './slices/authSlice';
import type { AppDispatch } from './useRedux';


export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, tokens } = useSelector((state: RootState) => state.auth);

  return {
    user,
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