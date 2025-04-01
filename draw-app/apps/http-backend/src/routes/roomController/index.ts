import express, { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';

const roomRouter: Router = express.Router();

roomRouter.post('/create', authMiddleware, (req, res) => {
  // Logic to create a room
  res.status(200).json({ message: 'Room created successfully', roomId: 123 });
});

export default roomRouter;
