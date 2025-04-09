import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import authMiddleWare from '../middleware/authMiddleware';

const userController: Router = express.Router();

userController.post('/signin', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Validate the zod schema
    // Create user in DB
    res.json({ message: 'Signed up Successfully!' });
  } catch (error) {
    throw { status: 411, message: error };
  }
});

userController.post('/signin', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Validate the zod schema

    const token = jwt.sign('1', JWT_SECRET);

    res.json({ token });
  } catch (error) {
    throw { status: 411, message: error };
  }
});

export default userController;
