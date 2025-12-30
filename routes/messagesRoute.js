import express from 'express';
import { store, index, getByRoomId } from '../controllers/messageController.js';

export const router = express.Router();

router.get('/', index);
router.post('/', store);
router.get('/:roomId', getByRoomId);
