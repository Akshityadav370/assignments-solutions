import { JWT_SECRET } from '@repo/backend-common/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

function authMiddleWare(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      throw { status: 404, message: 'No token provided' };
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = decoded.userId as string;
      next();
    } else {
      throw { status: 404, message: 'Token expired! Login again!' };
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export default authMiddleWare;
