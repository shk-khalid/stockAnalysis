import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { authService } from '../../services/authService';
import type { User, AuthTokens } from '../../components/types/auth';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export const initAuth = createAsyncThunk(
  'auth/init',
  async (_, { rejectWithValue }) => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return rejectWithValue('No valid session found');
    }

    const user: User = {
      id: session.user.id,
      email: session.user.email!,
      name: session.user.user_metadata.name || '',
    };

    const tokens: AuthTokens = {
      access: session.access_token,
      refresh: session.refresh_token,
    };

    return { tokens, user };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { user, session } = await authService.login({ email, password });

    if (!user || !session) throw new Error('Login failed');

    return {
      user: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name || '',
      },
      tokens: {
        access: session.access_token,
        refresh: session.refresh_token,
      }
    };
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { user, session } = await authService.register({ email, password, name });

    // Registration might not return a session if email confirmation is required
    if (!user) throw new Error('Registration failed');

    if (session) {
      return {
        user: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata.name || '',
        },
        tokens: {
          access: session.access_token,
          refresh: session.refresh_token,
        }
      };
    }
    return null; // Handle case where email confirmation is needed
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const initialState: AuthState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
  initialized: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.tokens = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSession: (state, action) => {
      state.tokens = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(initAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.tokens = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Logout failed';
        state.user = null;
        state.tokens = null;
      });
  },
});

export const { clearError, clearAuth, setUser, setSession } = authSlice.actions;
export default authSlice.reducer;