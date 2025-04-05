import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './useRedux';
import { login, register, logout } from './slices/authSlice';
import type { AppDispatch } from './useRedux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error, tokens } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!tokens,
    login: (email: string, password: string) => 
      dispatch(login({ email, password })),
    register: (email: string, password: string, name: string) =>
      dispatch(register({ email, password, name })),
    logout: handleLogout,
  };
}