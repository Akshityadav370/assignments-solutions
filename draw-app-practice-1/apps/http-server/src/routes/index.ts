import express, { Router } from 'express';
import userController from '../controller/userController';
import roomController from '../controller/roomController';

const router: Router = express.Router();

router.use('/auth', userController);
router.use('/room', roomController);

export default router;
