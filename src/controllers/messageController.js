import { getMessagesService } from '../services/messageService.js';
import {
  successResponse,
  customErrorResponse,
  internalErrorResponse
} from '../utils/common/responseObjects.js';
import { StatusCodes } from 'http-status-codes';

export const getMessagesController = async (req, res) => {
  try {
    const messages = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(messages, 'Messages Fetched Successfully'));
  } catch (error) {
    console.log('Get Message Controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
