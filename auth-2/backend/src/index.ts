import express, { NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/route';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';
import { PORT } from './constants';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  // connect database
  console.log('Listening on ', PORT);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing database connection...');
  //   disconnect database
  process.exit(0);
});
