import type { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/UserService.ts';

export const signin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = UserService.signin(username, password);
    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }
    res.cookie('jwt', user.token);
    return res.status(200).json({ username: user.username, id: user.id });
  } catch (e) {
    next(e);
  }
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = UserService.signup(username, password) as {
      token: string;
      id: string;
      username: string;
    };
    if (!user) {
      return next({ status: 400, message: 'Error creating user' });
    }
    res.cookie('jwt', user.token);
    res.status(201).json({ username: user.username });
  } catch (e) {
    if (e instanceof Error && 'errcode' in e) {
      if (e.errcode === 2067) {
        return next({ status: 409, message: 'Username already exists' });
      }

      return next(e);
    }
  }
};
