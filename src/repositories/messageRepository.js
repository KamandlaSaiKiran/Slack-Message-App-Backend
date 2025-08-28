import crudRepository from './crudRepository.js';
import Message from '../schema/users.js';
const messageRespository = {
  ...crudRepository,
  getPaginatedMessages: async (messageParams, page, limit) => {
    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderId', 'username email avatar');
    return messages;
  }
};

export default messageRespository;
