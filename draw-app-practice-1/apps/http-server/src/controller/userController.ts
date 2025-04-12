import express, { NextFunction, Request, Response, Router } from 'express';
import {
  ACCESS_TOKEN,
  CreateUserSchema,
  LoginUserSchema,
  REFRESH_TOKEN,
} from '@repo/common/types';
import bcrypt from 'bcrypt';
import { prismaClient } from '@repo/db/client';
import { generateToken } from '../utils';
import authMiddleWare, {
  AuthenticatedRequest,
} from '../middleware/authMiddleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';

const userController: Router = express.Router();

userController.post('/signup', async (req: Request, res: Response) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      throw new Error('Invalid data sent!');
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    res.json({ message: 'Signed up Successfully!' });
  } catch (error) {
    throw { status: 411, message: error };
  }
});

userController.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = LoginUserSchema.safeParse(req.body);
      if (!parsedData.success) {
        throw new Error('Invalid data sent!');
      }
      const { email, password } = parsedData.data;
      const user = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw { status: 401, message: 'Invalid Credentials' };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid Credentials' };
      }

      const accessToken = generateToken(user.id);
      res.cookie(ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });

      const refreshToken = generateToken(user.id);
      res.cookie(REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });

      res.json({ user, message: 'Login Successful!' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

userController.get(
  '/token',
  authMiddleWare,
  (req: AuthenticatedRequest, res) => {
    const wsToken = jwt.sign({ userId: req.userId }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token: wsToken });
  }
);

export default userController;
