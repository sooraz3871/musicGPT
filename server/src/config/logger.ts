import { createLogger, format, transports } from 'winston';


const { combine, timestamp, printf, colorize, align } = format;

const logFormat = printf(({ level, message, timestamp,  ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message}`;
  if (metadata.filePath) {
    msg = `${timestamp} [${level}] [${metadata.filePath}] [${metadata.functionName}] : ${message}`;
  }
  return msg;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export const log = (level: string, message: string, filePath?: string, functionName?: string) => {
  logger.log(level, message, { filePath, functionName });
};

export default logger;
