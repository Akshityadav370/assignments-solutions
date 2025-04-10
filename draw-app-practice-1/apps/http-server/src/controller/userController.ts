import express, { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, LoginUserSchema } from '@repo/common/types';
import bcrypt from 'bcrypt';
import { prismaClient } from '@repo/db/client';

const userController: Router = express.Router();

userController.post('/signin', async (req: Request, res: Response) => {
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

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default userController;
