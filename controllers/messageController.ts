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

export const getByRoomId = (
  req: Request<{ roomId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roomId } = req.params;
    const messages = MessageService.getByRoomId(roomId);
    res.send(messages);
  } catch (e) {
    next(e);
  }
};

export const store = (req: Request, res: Response, next: NextFunction) => {
  try {
    const io = req.app.get('socketio');

    const { user_id, message, room_id } = req.body;
    const msg = MessageService.create({ user_id, message, room_id });

    io.emit('message', msg);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};
