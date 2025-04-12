import { BACKEND_URL, WEBSOCKET_URL } from '@repo/common/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useSocket = () => {
  const [loading, setLoading] = useState<boolean>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function connectWebSocket() {
      try {
        const tokenResponse = await axios.get(`${BACKEND_URL}/auth/token`, {
          withCredentials: true,
        });

        const token = tokenResponse.data.token;

        const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

        ws.onopen = () => {
          setLoading(false);
          setSocket(ws);
        };

        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          setError(new Error('WebSocket connection failed'));
          setLoading(false);
        };

        return () => {
          if (
            ws.readyState === WebSocket.OPEN ||
            ws.readyState === WebSocket.CONNECTING
          ) {
            ws.close();
          }
        };
      } catch (error) {
        console.error('Failed to get token for WebSocket connection:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
        setLoading(false);
      }
    }

    connectWebSocket();
  }, []);

  return {
    loading,
    socket,
    error,
  };
};

export default useSocket;
