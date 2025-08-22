import channelRepository from '../repositories/channelRepository.js';
import { StatusCodes } from 'http-status-codes';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);
    console.log(channel);

    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found with the channel Id',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    );

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User is not a member of the workspace and hence cannot access the channel',
        explanation: 'User is not a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    return channel;
  } catch (error) {
    console.log('Get channel by Id Service error', error);
    throw error;
  }
};
