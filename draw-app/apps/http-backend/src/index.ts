import express, { json } from 'express';
import mainRouter from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

const app = express();

app.use(json());

app.use('/api/v1', mainRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3001);
