import mongoose from 'mongoose';
import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';

export default async function connectDB() {
  const uri = NODE_ENV === 'development' ? DEV_DB_URL : PROD_DB_URL;
  console.log('Connecting to MongoDB URI:', uri); // <- Debug log
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DEV_DB_URL);
    } else {
      await mongoose.connect(PROD_DB_URL);
    }
    console.log(`Connected to mongoDB database from ${NODE_ENV} environment`);
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
}
