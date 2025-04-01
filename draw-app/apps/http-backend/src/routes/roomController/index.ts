import express, { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { CreateRoomSchema } from '@repo/common/types';

const roomRouter: Router = express.Router();

roomRouter.post('/create', authMiddleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    throw { status: 404, message: 'Invalid data' };
  }

  // Logic to create a room
  res.status(200).json({ message: 'Room created successfully', roomId: 123 });
});

export default roomRouter;
