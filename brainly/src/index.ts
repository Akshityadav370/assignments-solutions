import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { userRouter } from './routes/user';
import { connectToDatabase } from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('Server running on port', PORT));
});
