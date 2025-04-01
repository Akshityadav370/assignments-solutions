import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  const url = req.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  const decode = jwt.verify(token, JWT_SECRET);

  if (!decode) {
    console.log('Invalid token! Closing connection...');
    ws.close();
    return;
  }

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
