import express, { NextFunction, Request, Response } from 'express';
import { User, validateUser } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER_SECRET } from '../middleware/user';

export const userRouter = express.Router();

// User
// 1. Signup
// 2. Login
userRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(411).json({ message: 'Error in inputs' });
    }

    validateUser({ username, password });

    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({
        message: 'User already exists with this username',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({
      message: 'Signed up',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    validateUser({ username, password });

    if (!username || !password) {
      res.status(411).json({
        message: 'Error in username/password',
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(403).json({ message: 'Invalid username/password' });
      return;
    }

    const matched = await bcrypt.compare(password, user?.password);
    if (!matched) {
      res.status(403).json({ message: 'Wrong username/password' });
    }

    const token = jwt.sign({ userId: user._id }, USER_SECRET || '', {
      expiresIn: '1h',
    });

    res.status(200).json({
      token: token,
      username,
      message: 'Login Successfull',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});
