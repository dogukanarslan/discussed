import type { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/MessageService.ts';

export const index = (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = MessageService.getAll();
    res.send(messages);
  } catch (e) {
    next(e);
  }
};

export const getBySubjectId = (
  req: Request<{ subjectId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { subjectId } = req.params;
    const messages = MessageService.getBySubjectId(subjectId);
    res.send(messages);
  } catch (e) {
    next(e);
  }
};

export const store = (req: Request, res: Response, next: NextFunction) => {
  try {
    const io = req.app.get('socketio');

    const { user_id, message, subject_id } = req.body;
    const msg = MessageService.create({ user_id, message, subject_id });

    io.emit('message', msg);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};
