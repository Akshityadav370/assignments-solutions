import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on('connection', function (socket) {
  console.log('user connected');
  //   setInterval(() => {
  //     socket.send('asdf' + Math.random());
  //   }, 1000);

  socket.on('message', (e) => {
    if (e.toString() === 'ping') {
      socket.send('pong');
      console.log(e.toString());
    }
  });
});
