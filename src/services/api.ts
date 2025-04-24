import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'https://stock-analysis-web.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists in localStorage under "auth_tokens"
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = localStorage.getItem('auth_tokens');
    if (tokens) {
      try {
        const { access } = JSON.parse(tokens);
        if (access) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${access}`;
        }
      } catch (error) {
        console.error('Error parsing auth_tokens from localStorage:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export default api;
