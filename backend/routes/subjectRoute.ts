import express from 'express';
import {
  store,
  index,
  deleteSubject,
} from '../controllers/subjectController.ts';

export const router = express.Router();

router.get('/', index);
router.post('/', store);
router.delete('/:subjectId', deleteSubject);
