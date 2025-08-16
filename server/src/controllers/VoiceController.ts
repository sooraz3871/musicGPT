import { Request, Response } from 'express';
import { VoiceService } from '@services/VoiceService';
import { sendSuccess, sendError } from '@helpers/response';
import { STATUS_CODES, MESSAGES } from '@config/constants';
import logger from '../config/logger';

const voiceService = new VoiceService();

/**
 * Gets the voices.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getVoices = async (req: Request, res: Response) => {
  try {
    logger.info('Attempting to fetch voices', { filePath: __filename, functionName: 'getVoices' });
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const data = await voiceService.getVoices(page, limit);
    sendSuccess(res, data, MESSAGES.VOICES_FETCHED, STATUS_CODES.OK);
    logger.info('Voices fetched successfully', { filePath: __filename, functionName: 'getVoices' });
  } catch (error: any) {
    logger.error(`Error fetching voices: ${error.message}`, { filePath: __filename, functionName: 'getVoices', stack: error.stack });
    sendError(res, MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};
