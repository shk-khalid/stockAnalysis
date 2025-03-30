import api from './api';
/* import { User } from '../components/types/auth';
import { store } from '../hooks/useRedux'; */

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
            const response = await api.post('/auth/logout/', { refresh: refreshToken });
            return response.data;
        } catch (error: any) {
            throw error; // Ensure error is caught in logout thunk
        }
    },

    /* getCurrentUser(): User | null {
        const userString = sessionStorage.getItem("user");
        return userString ? JSON.parse(userString) : store.getState().auth.user;
      }, */
};
