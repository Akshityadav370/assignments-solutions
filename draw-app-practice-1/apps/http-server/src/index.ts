import express from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/api/v1', router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log('App listening on PORT ' + 3001);
});
