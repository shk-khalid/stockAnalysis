import { useEffect, useRef, useState } from 'react';

interface Alert {
  symbol: string;
  type: string;
  message: string;
  severity: string;
  timestamp: string;
  triggerPrice: number;
  currentPrice: number;
}

export function useAlertWebSocket() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    // Get the JWT token from localStorage
    const authTokens = localStorage.getItem('auth_tokens');
    const tokens = authTokens ? JSON.parse(authTokens) : null;
    const accessToken = tokens?.access;

    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    // Connect to the WebSocket through the Vite proxy with JWT authentication
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/alerts/?token=${accessToken}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      
      // Send authentication message with JWT
      ws.send(JSON.stringify({
        type: 'authenticate',
        token: accessToken
      }));
    };

    ws.onmessage = (event) => {
      try {
        const alert: Alert = JSON.parse(event.data);
        setAlerts((prevAlerts) => [alert, ...prevAlerts]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      // Attempt to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const reconnect = () => {
    connectWebSocket();
  };

  return { alerts, isConnected, reconnect };
}