import { UserService } from '../services/UserService.js';
import type { Request, Response, NextFunction } from 'express';

export const signin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = UserService.signin(username, password);
    if (!user) {
      return;
    }
    res.cookie('jwt', user.token);

    return res.status(200).json(user);
  } catch (e) {
    if (e instanceof Error) {
      throw { message: e.message };
    }
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
      return;
    }
    res.cookie('jwt', user.token);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (e) {
    if (e instanceof Error && 'errcode' in e) {
      if (e.errcode === 2067) {
        return next({ status: 409, message: 'Username already exists' });
      }

      return next(e);
    }
  }
};
