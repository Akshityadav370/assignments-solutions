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

const users = new Map<string, User>();

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (decode && typeof decode === 'object' && 'userId' in decode) {
      return decode.userId as string;
    }
  } catch (error) {
    console.log('Invalid token! Closing connection...');
  }
  return null;
}

wss.on('connection', (ws, req) => {
  console.log('Client connected');

  const url = req.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  users.set(userId, { userId, rooms: [], ws });

  ws.on('message', async (message) => {
    const parsedData = JSON.parse(message as unknown as string);
    console.log('data', parsedData);

    const user = users.get(userId);
    if (!user) return;

    if (parsedData.type === JOIN_ROOM) {
      user.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === LEAVE_ROOM) {
      user.rooms = user.rooms.filter((x) => x !== parsedData.room);
    }

    if (parsedData.type === CHAT) {
      const { roomId, message } = parsedData;

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      for (const [, u] of users) {
        if (u.rooms.includes(roomId)) {
          u.ws.send(JSON.stringify({ type: CHAT, message, roomId }));
        }
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    users.delete(userId);
  });
});
