import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { generateAccessToken } from '../helpers';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

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

    const user = await User.findOne({
      $where: `this.name === "${name}" && this.password === "${password}"`,
    });

    if (!user) {
      throw {
        status: 401,
        message: 'Invalid credentials',
      };
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ user }, JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({
      accessToken,
      refreshToken,
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
      res.status(200).json({
        accessToken,
      });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
