import { WebSocketServer, WebSocket } from 'ws';

interface User {
  socket: WebSocket;
  room: string;
}

const wss = new WebSocketServer({ port: 8080 });
const rooms: Record<string, Set<WebSocket>> = {};

wss.on('connection', (socket) => {
  console.log('New user connected');

  let userRoom: string | null = null;

  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === 'join') {
        const roomId = parsedMessage.payload.roomId;
        userRoom = roomId;

        if (!rooms[roomId]) {
          rooms[roomId] = new Set();
        }
        rooms[roomId].add(socket);
      }

      if (parsedMessage.type === 'chat' && userRoom) {
        const receivedMessage = parsedMessage.payload.message;

        rooms[userRoom]?.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(receivedMessage);
          }
        });
      }
    } catch (err) {
      console.error('Invalid message format:', err);
    }
  });

  socket.on('close', () => {
    if (userRoom && rooms[userRoom]) {
      rooms[userRoom].delete(socket);
      if (rooms[userRoom].size === 0) {
        delete rooms[userRoom];
      }
    }
    console.log('User disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
