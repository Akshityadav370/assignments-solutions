import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { generateAccessToken } from '../helpers';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, JWT_SECRET, REFRESH_TOKEN } from '../constants';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw {
        status: 400,
        message: 'All fields are required',
      };
    }

    const user = await User.findOne({ name });
    if (!user) {
      throw {
        status: 401,
        message: 'Invalid credentials',
      };
    }

    const accessToken = generateAccessToken(user);
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    const refreshToken = jwt.sign({ user }, JWT_SECRET!, { expiresIn: '1d' });
    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.status(200).json({
      user,
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw {
        status: 400,
        message: 'All fields are required',
      };
    }

    const user = await User.create({ name, password });

    res.status(201).json({
      user,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const tokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw {
        status: 403,
        message: 'User not authorised',
      };
    }

    jwt.verify(refreshToken, JWT_SECRET!, (err: Error | null, user: any) => {
      if (err) {
        throw { status: 403, message: 'Verification failed' };
      }
      const accessToken = generateAccessToken(user);
      res.cookie(ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: false,
        path: '/',
      });
      res.status(200).json({ message: 'Token refreshed successfully' });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
