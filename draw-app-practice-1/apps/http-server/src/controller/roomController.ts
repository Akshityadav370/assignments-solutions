import express, { Request, Response, Router } from 'express';
import authMiddleWare, {
  AuthenticatedRequest,
} from '../middleware/authMiddleware';

const roomController: Router = express.Router();

roomController.post(
  '/create',
  authMiddleWare,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name } = req.body;
      // Create room

      // Send room Id
      res.json({ roomId: 2 });
    } catch (error) {
      throw { status: 411, message: error };
    }
  }
);
