import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken';

export const USER_SECRET = process.env.USER_SECRET || '';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, USER_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded !== 'object') {
        return res.status(401).json({ message: 'Forbidden: Invalid Token' });
      }

      req.userId = (decoded as { userId: string }).userId;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorised' });
    return;
  }
};
