import express, { Request, Response, Router } from 'express';
import {
  AuthenticatedRequest,
  authMiddleware,
} from '../../middleware/authMiddleware';
import { CreateRoomSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const roomRouter: Router = express.Router();

roomRouter.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: Number(roomId),
      },
      orderBy: {
        id: 'desc',
      },
      take: 50,
    });
    res.json({ messages });
  } catch (error) {
    throw {
      status: 500,
      message: 'Error Fetching Messages from RoomId',
    };
  }
});

roomRouter.post(
  '/create',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
      throw { status: 404, message: 'Invalid data' };
    }
    try {
      console.log('hi', data.data.name, req.userId);

      if (!req.userId) {
        res.status(401).json({ message: 'User not authenticated properly' });
      }
      // Logic to create a room
      const room = await prismaClient.room.create({
        data: {
          slug: data.data.name,
          admin: {
            connect: {
              id: req.userId?.toString(),
            },
          },
        },
      });

      console.log('hello', room.id, room);
      res
        .status(200)
        .json({ message: 'Room created successfully', roomId: room.id });
    } catch (error) {
      console.error(error);
      throw { status: 500, error };
    }
  }
);

roomRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });
    if (!room) {
      throw { status: 404, message: 'Room not found' };
    }
    res.json({ room });
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Error Fetching Room' };
  }
});

export default roomRouter;
