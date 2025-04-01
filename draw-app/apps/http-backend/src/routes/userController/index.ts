import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, LoginUserSchema } from '@repo/common/types';

const userRouter: Router = express.Router();

userRouter.post('/signup', (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    throw { status: 404, message: 'Invalid data' };
  }

  res.json({ userId: 1 });
});
userRouter.post('/signin', (req, res) => {
  const data = LoginUserSchema.safeParse(req.body);
  if (!data.success) {
    throw { status: 404, message: 'Invalid data' };
  }

  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token,
  });
});

export default userRouter;
