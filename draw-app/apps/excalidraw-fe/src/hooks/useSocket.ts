import { useEffect, useState } from 'react';
import { WEBSOCKET_URL } from '../config';

const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const url = WEBSOCKET_URL + `?token=${localStorage.getItem('token')}`;
    console.log('url', url);
    if (!socket) {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
      };
    }

    return () => {
      setSocket(null);
    };
  }, []);

  return {
    loading,
    socket,
  };
};

export default useSocket;
