import e, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

// Extend Request type to include userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Middleware logic to check authentication
    const token = req.headers['authorization'];

    if (!token) {
      throw { status: 404, message: 'No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = decoded.userId as string;
      next();
    } else {
      throw { status: 404, message: 'Unauthorised' };
    }

    // Here you would typically verify the token and extract user information
    // For simplicity, let's assume the token is valid

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
