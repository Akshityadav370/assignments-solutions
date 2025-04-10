import express, { NextFunction, Request, Response, Router } from 'express';
import authMiddleWare, {
  AuthenticatedRequest,
} from '../middleware/authMiddleware';
import { prismaClient } from '@repo/db/client';
import { CreateRoomSchema } from '@repo/common/types';

const roomController: Router = express.Router();

roomController.get(
  '/chat/:roomId',
  authMiddleWare,
  async (req: Request, res: Response) => {
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
  }
);

roomController.post(
  '/create',
  authMiddleWare,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const parsedData = CreateRoomSchema.safeParse(req.body);
      if (!parsedData.success) {
        throw { status: 404, message: 'Invalid data' };
      }
      if (!req.userId) {
        res.status(401).json({ message: 'User unauthorised!' });
      }

      const { name } = parsedData.data;

      const room = await prismaClient.room.create({
        data: {
          slug: name,
          admin: {
            connect: {
              id: req.userId,
            },
          },
        },
      });

      // Send room Id
      res.json({ roomId: room.id, message: 'Room Created Succesfully!' });
    } catch (error) {
      next(error);
    }
  }
);

roomController.get(
  '/:slug',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const room = await prismaClient.room.findFirst({ where: { slug } });

      if (!room) {
        throw { status: 201, message: 'Room not found!' };
      }

      res.json({ room });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
