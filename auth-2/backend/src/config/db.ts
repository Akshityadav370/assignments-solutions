import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI || '');
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from Database');
  } catch (error) {
    console.error('Error disconnecting from Database', error);
  }
};
