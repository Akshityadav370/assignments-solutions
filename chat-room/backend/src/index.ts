import WebSocket from 'ws';
import morgan from 'morgan';
import express from 'express';

interface User {
  name: string;
  room: string;
  socket: WebSocket;
}

const rooms: { [key: string]: User[] } = {};
const users: { [key: string]: User } = {};

const app = express();
const wsServer = new WebSocket.Server({ port: 8080 });

app.use(morgan('combined'));

wsServer.on('connection', (socket: WebSocket) => {
  let currentUser: User | null = null;

  socket.on('message', (message: string) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        const { name, room } = data.payload;
        currentUser = { name, room, socket };
        if (!users[name]) {
          users[name] = currentUser;
        }

        if (!rooms[room]) {
          rooms[room] = [];
        }
        rooms[room].push(currentUser);

        const welcomeMessage = {
          type: 'welcome',
          message: `${name} has joined the room.`,
        };
        rooms[room].forEach((user) =>
          user.socket.send(JSON.stringify(welcomeMessage))
        );
        break;

      case 'message':
        if (currentUser) {
          const { room } = currentUser;
          const messageData = {
            type: 'message',
            name: currentUser.name,
            message: data.payload.message,
          };
          rooms[room].forEach((user) =>
            user.socket.send(JSON.stringify(messageData))
          );
        }
        break;

      case 'leave':
        if (currentUser) {
          const { room } = currentUser;
          rooms[room] = rooms[room].filter((user) => user !== currentUser);
          delete users[currentUser.name];
          currentUser.socket.close();
        }
        break;
    }
  });

  socket.on('close', () => {
    if (currentUser) {
      const { room } = currentUser;
      rooms[room] = rooms[room].filter((user) => user !== currentUser);
      delete users[currentUser.name];
    }
  });
});
