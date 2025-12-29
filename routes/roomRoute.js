import express from 'express';
import {store, index} from '../controllers/roomController.js';

export const router = express.Router();

router.get('/', index);
router.post('/', store);
