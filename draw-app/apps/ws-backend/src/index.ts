import WebSocket, { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { JOIN_ROOM, CHAT, LEAVE_ROOM } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  const decode = jwt.verify(token, JWT_SECRET);

  if (!decode) {
    console.log('Invalid token! Closing connection...');
    return null;
  }

  if (decode && typeof decode === 'object' && 'userId' in decode) {
    return decode.userId as string;
  }

  return null;
}

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  const url = req.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return;
  }

  users.push({ userId, rooms: [], ws });

  ws.on('message', async (message) => {
    const parsedData = JSON.parse(message as unknown as string);
    console.log('data', parsedData);

    if (parsedData.type === JOIN_ROOM) {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === LEAVE_ROOM) {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }

      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === CHAT) {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({ type: CHAT, message: message, roomId })
          );
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
