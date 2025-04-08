import express from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(() => {
  console.log(3001, 'HTTP server running on port 3001');
});
