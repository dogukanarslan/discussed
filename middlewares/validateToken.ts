import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const cookies = req.headers.cookie ?? '';
  const token = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('jwt='))
    ?.slice('jwt='.length);

  if (!token) {
    return next({ status: 401, message: 'Token not found' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return next();
  } catch (e) {
    return next({ status: 401, message: 'Invalid token' });
  }
};
