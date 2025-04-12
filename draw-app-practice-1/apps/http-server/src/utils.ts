import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h',
  });
};
