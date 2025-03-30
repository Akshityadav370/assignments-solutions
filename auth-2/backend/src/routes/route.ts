import express from 'express';
import {
  loginController,
  signUpController,
  tokenController,
} from '../controllers/auth';
import authMiddleware from '../middleware/authMiddleware';
import { getTweetController } from '../controllers/tweets';

const router = express.Router();

router.post('/login', loginController);
router.post('/signup', signUpController);
router.get('/generate-token', tokenController);
router.get('/get-tweets/:id', authMiddleware, getTweetController);

export default router;
