import { StatusCodes } from 'http-status-codes';
import channelRepository from '../repositories/channelRepository.js';
import messageRespository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService';

export const getMessagesService = async (messageParams, page, limit, user) => {
  const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(
    messageParams.channelId
  );
  const messages = await messageRespository.getPaginatedMessages(
    messageParams,
    page,
    limit
  );

  const workspace = channelDetails.workspaceId;
  const isMember = isUserMemberOfWorkspace(workspace, user);

  if (!isMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
  return messages;
};
