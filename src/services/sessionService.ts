const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

class SessionService {
    private timer: number | null = null;

  constructor() {
    this.resetTimer = this.resetTimer.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  init() {
    // Add event listeners for user activity
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, this.resetTimer);
    });

    // Initial timer setup
    this.resetTimer();
  }

  cleanup() {
    // Remove event listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.removeEventListener(event, this.resetTimer);
    });

    // Clear the timeout
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private resetTimer() {
    // Clear existing timer
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Set new timer
    this.timer = setTimeout(this.clearSession, INACTIVITY_TIMEOUT);
  }

  private clearSession() {
    // Clear all items from sessionStorage
    sessionStorage.clear();

    // Reload the page to reset the application state
    window.location.reload();
  }
}

export const sessionService = new SessionService();