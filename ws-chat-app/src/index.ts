import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let usersConnected = 0;
let allSockets: WebSocket[] = [];

wss.on('connection', (socket) => {
  allSockets.push(socket);
  usersConnected += 1;
  console.log('User Connected #' + usersConnected);

  socket.on('message', (e) => {
    console.log(e.toString);
    allSockets.forEach((s) => {
      s.send(e.toString() + ':message sent from server!');
    });
  });

  socket.on('close', () => {
    usersConnected -= 1;
    console.log('socket disconnected/closed #' + usersConnected);
    allSockets = allSockets.filter((x) => x != socket);
  });
});
