"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const rooms = {};
wss.on('connection', (socket) => {
    console.log('New user connected');
    let userRoom = null;
    socket.on('message', (message) => {
        var _a;
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
                (_a = rooms[userRoom]) === null || _a === void 0 ? void 0 : _a.forEach((client) => {
                    if (client !== socket && client.readyState === ws_1.WebSocket.OPEN) {
                        client.send(receivedMessage);
                    }
                });
            }
        }
        catch (err) {
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
