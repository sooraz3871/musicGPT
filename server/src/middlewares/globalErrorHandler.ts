import { Request, Response, NextFunction } from 'express';
import { sendError } from '@helpers/response';
import { STATUS_CODES, MESSAGES } from '@config/constants';
import logger from '../config/logger';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { filePath: __filename, functionName: 'globalErrorHandler', stack: err.stack });
  sendError(
    res,
    MESSAGES.INTERNAL_SERVER_ERROR,
    STATUS_CODES.INTERNAL_SERVER_ERROR
  );
};
