import express from 'express';
import { PORT } from './config/serverConfig.js';
import { StatusCodes } from 'http-status-codes';
import connectDB from './config/dBConfig.js';
import apiRouter from './routes/apiRoutes.js';
// import mailer from './config/mailConfig.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Ping Request Successfull'
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  // const mailResponse = await mailer.sendMail({
  //   from: 'kamandlasaikiran@gmail.com',
  //   to: 'kamandlasaikiran@gmail.com',
  //   subject:'Welcome Mail',
  //   text: 'Welcome to the application'
  // });
  // console.log(mailResponse);
});

app.use('/api', apiRouter);
