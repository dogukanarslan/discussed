import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  const status: number = err.status || 500;
  res
    .status(status)
    .json({ status, message: err.message || 'Internal Server Error' });
};
