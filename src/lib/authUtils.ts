import { jwtDecode } from 'jwt-decode';
import type { AuthTokens, User } from '../components/types/auth';

interface JwtPayload {
  exp: number;
  user_id: number;
  email?: string;
  name?: string;
  // Include other fields that your JWT payload contains.
}

/**
 * Retrieves the current user information from the access token.
 * Returns null if no valid token is found or if it is expired.
 */
export const getCurrentUser = (): User | null => {
  const tokensStr = localStorage.getItem('auth_tokens');
  if (!tokensStr) return null;

  try {
    const tokens: AuthTokens = JSON.parse(tokensStr);
    if (!tokens.access) return null;

    // Decode the access token
    const decoded = jwtDecode<JwtPayload>(tokens.access);

    // Check token expiration (exp is in seconds)
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return null;
    }

    // Build the user object from the token payload.
    // Adjust these fields based on the structure of your JWT.
    const user: User = {
      id:   String(decoded.user_id),
      email: decoded.email || '',
      name: decoded.name || '',
    };

    return user;
  } catch (error) {
    console.error('Error decoding auth token:', error);
    return null;
  }
};

/**
 * Checks if a user is currently authenticated.
 * It does this by attempting to retrieve the current user.
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
