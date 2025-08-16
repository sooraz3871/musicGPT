import { Request, Response } from 'express';
import { PromptService } from '@services/PromptService';
import { sendSuccess, sendError } from '@helpers/response';
import { STATUS_CODES, MESSAGES } from '@config/constants';
import logger from '../config/logger';

const promptService = new PromptService();

/**
 * Creates a new prompt.
 * @param req - The request object.
 * @param res - The response object.
 */
export const createPrompt = async (req: Request, res: Response) => {
  try {
    logger.info('Attempting to create a new prompt', { filePath: __filename, functionName: 'createPrompt' });
    const { prompt, type } = req.body;
    const data = await promptService.createPrompt(prompt, type);
    sendSuccess(res, data, MESSAGES.PROMPT_CREATED, STATUS_CODES.CREATED);
    logger.info('Prompt created successfully', { filePath: __filename, functionName: 'createPrompt' });
  } catch (error: any) {
    logger.error(`Error creating prompt: ${error.message}`, { filePath: __filename, functionName: 'createPrompt', stack: error.stack });
    sendError(res, MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};
