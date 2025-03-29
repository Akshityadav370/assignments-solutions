import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { IUser } from '../models/User';

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ username: user.username }, JWT_SECRET!, {
    expiresIn: '20s',
  });
};
