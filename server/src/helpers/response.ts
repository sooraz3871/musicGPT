import { Response } from 'express';
import { IResponse } from '@interfaces/interfaces';
import { RESPONSE_MESSAGES } from '@config/constants';

/**
 * Sends a success response.
 * @param res - The response object.
 * @param data - The data to send.
 * @param message - The message to send.
 * @param statusCode - The status code to send.
 */
export const sendSuccess = (
  res: Response,
  data: any,
  message: string = RESPONSE_MESSAGES.SUCCESS,
  statusCode: number = 200
) => {
  const response: IResponse = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

/**
 * Sends an error response.
 * @param res - The response object.
 * @param message - The message to send.
 * @param statusCode - The status code to send.
 */
export const sendError = (
  res: Response,
  message: string = RESPONSE_MESSAGES.ERROR,
  statusCode: number = 500
) => {
  const response: IResponse = {
    success: false,
    message,
  };
  res.status(statusCode).json(response);
};
