import { WebSocketServer, WebSocket } from 'ws';

interface User {
  socket: WebSocket;
  room: string;
}

const wss = new WebSocketServer({ port: 8080 });

let usersConnected = 0;
let allSockets: User[] = [];

wss.on('connection', (socket) => {
  usersConnected += 1;
  console.log('User Connected #' + usersConnected);

  socket.on('message', (e) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(e.toString());
    if (parsedMessage.type === 'join') {
      allSockets.push({ socket, room: parsedMessage.payload.roomId });
    }

    if (parsedMessage.type === 'chat') {
      const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;
      const receivedMessage = parsedMessage.payload.message;

      allSockets.forEach((user) => {
        if (user.room === currentUserRoom) {
          user.socket.send(receivedMessage);
        }
      });
    }
  });

  socket.on('close', () => {
    usersConnected -= 1;
    console.log('socket disconnected/closed #' + usersConnected);
  });
});
