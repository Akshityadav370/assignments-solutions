import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

const validateUser = (token: string) => {
  const decode = jwt.verify(token, JWT_SECRET);

  if (decode && typeof decode === 'object' && 'userId' in decode) {
    return decode.userId as string;
  }

  console.log('Invalid token! Closing Connection...');
  return null;
};

wss.on('connection', (ws, req) => {
  console.log('Client Connected!');

  const url = req.url;
  if (!url) {
    console.error('Please send the token');
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  const userId = validateUser(token);

  if (userId == null) {
    ws.close(404, 'Unauthorised!');
    return;
  }

  ws.on('close', () => {
    console.log('Client Disconnected!');
  });
});
