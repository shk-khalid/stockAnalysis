import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../../services/authService';
import type { User, AuthTokens, AuthResponse } from '../../components/types/auth';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

const TOKEN_KEY = 'auth_tokens';

const initialState: AuthState = {
  // When the app loads, try to get tokens from localStorage.
  tokens: JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null'),
  // If tokens exist, attempt to decode the access token to set the current user.
  user: null,
  loading: false,
  error: null,
};

// Helper type for the JWT payload.
// Adjust the fields based on your JWT payload.
interface JwtPayload {
  exp: number;
  user_id: number;
  email?: string;
  name?: string;
}

/**
 * Decodes the access token (if available) from localStorage and returns a User object.
 * Returns null if no valid token is found or if the token is expired.
 */
export const getCurrentUser = (): User | null => {
  const tokensStr = localStorage.getItem(TOKEN_KEY);
  if (!tokensStr) return null;
  try {
    const tokens: AuthTokens = JSON.parse(tokensStr);
    if (!tokens.access) return null;
    const decoded = jwtDecode<JwtPayload>(tokens.access);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return null;
    }
    // Build and return the user object.
    const user: User = {
      id: String(decoded.user_id), // Convert number to string if necessary
      email: decoded.email || '',
      name: decoded.name || '',
    };
    return user;
  } catch (error) {
    console.error('Error decoding access token:', error);
    return null;
  }
};

/**
 * Returns true if a valid current user exists.
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authService.login({ email, password });
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const response = await authService.register({ email, password, name });
    return response;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshToken = state.auth.tokens?.refresh;
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      await authService.logout(refreshToken);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    // On load, try to set the current user from the token.
    user: getCurrentUser(),
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.tokens = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        localStorage.setItem(TOKEN_KEY, JSON.stringify(state.tokens));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens = null;
        localStorage.removeItem(TOKEN_KEY);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Logout failed';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
