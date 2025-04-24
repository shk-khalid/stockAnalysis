import { useSelector, useDispatch, } from 'react-redux';
import type { RootState } from './useRedux';
import { login, register, logout, initAuth } from './slices/authSlice';
import type { AppDispatch } from './useRedux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useCallback } from 'react';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error, tokens, initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(initAuth());
    }
  }, [dispatch, initialized]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  }, [dispatch, navigate]);

  const handleLogin = useCallback((email: string, password: string) => 
    dispatch(login({ email, password })), [dispatch]);

  const handleRegister = useCallback((email: string, password: string, name: string) =>
    dispatch(register({ email, password, name })), [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!tokens?.access,
    initialized,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}