import express from 'express';
import { PORT } from './config/serverConfig.js';
import { StatusCodes } from 'http-status-codes';
import connectDB from './config/dBConfig.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Ping Request Successfull'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

app.use('/api',apiRouter);
