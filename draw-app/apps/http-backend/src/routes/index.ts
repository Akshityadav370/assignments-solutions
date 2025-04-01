import express, { Router } from 'express';
import userRouter from './userController';
import roomRouter from './roomController';

const mainRouter: Router = express.Router();

mainRouter.use('/auth', userRouter);
mainRouter.use('/room', roomRouter);

export default mainRouter;
