import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    requried: [true, 'Message body is required']
  },
  image: {
    type: String
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    requried: [true, 'Channel Id is requried']
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'SenderId is required']
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workspace',
    required: [true, 'workspace id is required']
  }
});
const Message = mongoose.model('Message', messageSchema);
export default Message;
