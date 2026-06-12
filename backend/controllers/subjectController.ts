import type { Request, Response, NextFunction } from 'express';

import { SubjectService } from '../services/SubjectService.js';

export const index = (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = SubjectService.getAll();
    res.send(subjects);
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
    const room = SubjectService.create({
      name,
      user_id,
      description: description ?? null,
    });

    res.status(201).json(room);
  } catch (e) {
    next(e);
  }
};

export const deleteSubject = (
  req: Request<{ subjectId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { subjectId } = req.params;
    SubjectService.delete(parseInt(subjectId));
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
