import { store } from '../hooks/useRedux';
import { logout } from '../hooks/slices/authSlice';
import toast from 'react-hot-toast';

const ABSOLUTE_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

class SessionService {
  private inactivityTimer: number | null = null;
  private absoluteTimer: number | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.resetInactivityTimer = this.resetInactivityTimer.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  init() {
    if (this.isInitialized) {
      return;
    }

    // Add event listeners for user activity
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, this.resetInactivityTimer, { passive: true });
    });

    // Set up both timers
    this.resetInactivityTimer();
    this.startAbsoluteTimer();
    this.isInitialized = true;
  }

  cleanup() {
    if (!this.isInitialized) {
      return;
    }

    // Remove event listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.removeEventListener(event, this.resetInactivityTimer);
    });

    // Clear both timers
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    if (this.absoluteTimer) {
      clearTimeout(this.absoluteTimer);
      this.absoluteTimer = null;
    }

    this.isInitialized = false;
  }

  private resetInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.inactivityTimer = setTimeout(() => {
      this.clearSession('Session expired due to inactivity');
    }, INACTIVITY_TIMEOUT);
  }

  private startAbsoluteTimer() {
    if (this.absoluteTimer) {
      clearTimeout(this.absoluteTimer);
    }
    this.absoluteTimer = setTimeout(() => {
      this.clearSession('Session expired');
    }, ABSOLUTE_TIMEOUT);
  }

  private async clearSession(message: string = 'Session expired. Please login again.') {
    try {
      // Cleanup first to prevent any race conditions
      this.cleanup();

      toast.error(message);
      await store.dispatch(logout());
      
      // Use replace to prevent back navigation to protected routes
      window.location.replace('/login');
    } catch (error) {
      console.error('Error during session cleanup:', error);
      // Force a redirect to login even if logout fails
      window.location.replace('/login');
    }
  }
}

export const sessionService = new SessionService();