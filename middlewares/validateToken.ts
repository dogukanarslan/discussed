import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split('=')[1];

  if (!token) {
    throw Error('Token not found');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (e) {
    throw Error('Invalid token');
  }
};
