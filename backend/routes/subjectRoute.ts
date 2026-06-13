import express from 'express';
import {
  store,
  index,
  deleteSubject,
  show,
} from '../controllers/subjectController.js';

export const router = express.Router();

router.get('/', index);
router.get('/:subjectId', show);
router.post('/', store);
router.delete('/:subjectId', deleteSubject);
