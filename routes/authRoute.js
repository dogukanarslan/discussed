import express from 'express';
import {
  signin,
  signup,
  getConnectedUsers
} from '../controllers/authController.js';

export const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/connected-users', getConnectedUsers);
