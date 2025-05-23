import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

interface IGetUserAuthInfoRequest extends Request {
  user?: string | jwt.JwtPayload | undefined;
}

const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.accessToken;
  try {
    if (!token) {
      throw { status: 403, message: 'User not authorised' };
    }

    jwt.verify(token, JWT_SECRET!, (err, user) => {
      if (err) throw { status: 403, message: 'Verification failed' };
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default authMiddleware;
