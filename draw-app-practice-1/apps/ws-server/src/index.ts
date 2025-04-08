import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  console.log('Client Connected!');

  ws.on('close', () => {
    console.log('Client Disconnected!');
  });
});
