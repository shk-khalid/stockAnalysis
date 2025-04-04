export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
export const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws/alerts/';

// WebSocket Configuration
export const WS_CONFIG = {
  maxReconnectAttempts: 5,
  reconnectTimeout: 3000,
  debug: import.meta.env.DEV,
};