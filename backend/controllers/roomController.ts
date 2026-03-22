import type { Request, Response, NextFunction } from 'express';

import { RoomService } from '../services/RoomService.ts';

export const index = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = RoomService.getAll();
    res.send(rooms);
  } catch (e) {
    next(e);
  }
};

export const store = (
  req: Request<{}, {}, { name: string; description?: string; user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, user_id } = req.body;
    const room = RoomService.create({
      name,
      user_id,
      description: description ?? null,
    });

    res.status(201).json(room);
  } catch (e) {
    next(e);
  }
};

export const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params;
    RoomService.delete(parseInt(roomId));
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
