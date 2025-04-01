import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

const userRouter: Router = express.Router();

userRouter.post('/signup', (req, res) => {});
userRouter.post('/signin', (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    token,
  });
});

export default userRouter;
