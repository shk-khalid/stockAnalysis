import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LogoutData {
  refresh: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post('/auth/login/', data);
    return response.data;
  },

  logout: async (refreshToken: string) => {
    try {
      // This call sends the refresh token in the payload.
      // The axios interceptor will automatically add the access token (if available)
      // in the Authorization header as "Bearer <access token>".
      const response = await api.post('/auth/logout/', { refresh: refreshToken });
      return response.data;
    } catch (error: any) {
      throw error; // Ensure error is caught in your logout thunk or handling logic
    }
  },

  /* Optionally, you can add methods for getting the current user:
  getCurrentUser(): User | null {
    const userString = sessionStorage.getItem("user");
    return userString ? JSON.parse(userString) : store.getState().auth.user;
  },
  */
};
