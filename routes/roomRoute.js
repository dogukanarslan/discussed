import express from 'express';
import { store, index, deleteRoom } from '../controllers/roomController.js';

export const router = express.Router();

router.get('/', index);
router.post('/', store);
router.delete('/:roomId', deleteRoom);
