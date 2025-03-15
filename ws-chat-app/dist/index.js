"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usersConnected = 0;
let allSockets = [];
wss.on('connection', (socket) => {
    usersConnected += 1;
    console.log('User Connected #' + usersConnected);
    socket.on('message', (e) => {
        var _a;
        // @ts-ignore
        const parsedMessage = JSON.parse(e.toString());
        if (parsedMessage.type === 'join') {
            allSockets.push({ socket, room: parsedMessage.payload.roomId });
        }
        if (parsedMessage.type === 'chat') {
            const currentUserRoom = (_a = allSockets.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
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
