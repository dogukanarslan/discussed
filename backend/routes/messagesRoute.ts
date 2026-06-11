import express from 'express';
import { store, index, getBySubjectId } from '../controllers/messageController.ts';

export const router = express.Router();

router.get('/', index);
router.post('/', store);
router.get('/:subjectId', getBySubjectId);
