import { store } from '../hooks/useRedux';
import { logout } from '../hooks/slices/authSlice';
import toast from 'react-hot-toast';

const ABSOLUTE_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

class SessionService {
  private inactivityTimer: number | null = null;
  private absoluteTimer: number | null = null;

  constructor() {
    this.resetInactivityTimer = this.resetInactivityTimer.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  init() {
    // Add event listeners for user activity
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, this.resetInactivityTimer);
    });

    // Set up both timers
    this.resetInactivityTimer();
    this.startAbsoluteTimer();
  }

  cleanup() {
    // Remove event listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.removeEventListener(event, this.resetInactivityTimer);
    });

    // Clear both timers
    if (this.inactivityTimer) {
      window.clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    if (this.absoluteTimer) {
      window.clearTimeout(this.absoluteTimer);
      this.absoluteTimer = null;
    }
  }

  private resetInactivityTimer() {
    if (this.inactivityTimer) {
      window.clearTimeout(this.inactivityTimer);
    }
    this.inactivityTimer = window.setTimeout(this.clearSession, INACTIVITY_TIMEOUT);
  }

  private startAbsoluteTimer() {
    if (this.absoluteTimer) {
      window.clearTimeout(this.absoluteTimer);
    }
    this.absoluteTimer = window.setTimeout(this.clearSession, ABSOLUTE_TIMEOUT);
  }

  private async clearSession() {
    try {
      toast.error('Session expired. Please login again.');
      // Dispatch logout action to clear Redux state
      await store.dispatch(logout());
      
      // Clear all timers
      this.cleanup();
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during session cleanup:', error);
      // Force a redirect to login even if logout fails
      window.location.href = '/login';
    }
  }
}

export const sessionService = new SessionService();