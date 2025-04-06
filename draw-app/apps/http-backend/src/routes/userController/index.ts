import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, LoginUserSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const userRouter: Router = express.Router();

userRouter.post('/signup', async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw { status: 404, message: 'Invalid data' };
  }
  try {
    // TODO: hash the password
    const user = await prismaClient.user.create({
      data: {
        name: parsedData.data.name,
        password: parsedData.data.password,
        email: parsedData.data.email,
      },
    });
    res.json({ userId: user.id });
  } catch (error) {
    throw {
      status: 411,
      message: error,
    };
  }
});

userRouter.post('/signin', async (req, res) => {
  const parsedData = LoginUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw { status: 404, message: 'Invalid data' };
  }
  try {
    // TODO: Compare the hashed passwords
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
        password: parsedData.data.password,
      },
    });

    if (!user) {
      throw { status: 201, message: 'Invalid email/password!' };
    }

    console.log('/signin', JWT_SECRET);

    const token = jwt.sign({ userId: user?.id }, JWT_SECRET);

    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {}
});

export default userRouter;
