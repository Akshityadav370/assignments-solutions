import e, { NextFunction, Request, Response } from 'express';

type CustomError = Error & { status?: number };

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error: CustomError = new Error('API/route not found!');
  error.status = 404;
  next(error);
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: { message },
  });
}
