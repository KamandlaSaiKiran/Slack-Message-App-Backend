import express from 'express';
import { PORT } from './config/serverConfig.js';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import { Server } from 'socket.io';
// import messageHandlers from './controllers/messageSocketController.js';
import MessageSocketHandlers from './controllers/messageSocketController.js';
import ChannelSocketHandlers from './controllers/channelSocketController.js';
import connectDB from './config/dBConfig.js';
import apiRouter from './routes/apiRoutes.js';
// import mailer from './config/mailConfig.js';
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Ping Request Successfull'
  });
});

io.on('connection', (socket) => {
  //here whenever client connects to the server this callback (socket) will be called
  // console.log('a user connected ', socket.id);
  //here when ever a client messages, we collect it here from client and passed it to the server
  // socket.on('messageFromClient',(data)=>{
  //   console.log('Message from client',data);
  //here server sents or broadcasts the new message to everyone whoever connected to the server
  // io.emit('new message',data.toUpperCase());

  // });

  //  messageHandlers(io,socket);
  MessageSocketHandlers(io, socket);
  ChannelSocketHandlers(io, socket);
});
server.listen(PORT, async () => {
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
