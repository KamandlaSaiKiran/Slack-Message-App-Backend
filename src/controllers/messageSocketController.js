import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT
} from '../utils/common/eventConstants.js';
import { createMessageService } from '../services/messageService.js';
export default function messageHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const { channeId } = data;
    const messageResponse = await createMessageService(data);

    socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);

    io.to(channeId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse); //Implementation of Rooms
    cb({
      success: true,
      message: 'Successfully created the event',
      data: messageResponse
    });
  });
}
