import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { AppDataSource } from '@config/data-source';
import { redisClient } from '@config/redis';
import routes from '@routes/index';
import { globalErrorHandler } from '@middlewares/globalErrorHandler';
import logger from '@config/logger';
import * as path from "path";


const app: Application = express();


dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

app.use(express.json());

app.use('/api', routes);

// Global error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 3001;

import { seedDatabase } from './seed';

// ... (rest of the imports and app setup)

AppDataSource.initialize()
  .then(async () => {
    logger.info('Data Source has been initialized!', { filePath: __filename, functionName: 'AppDataSource.initialize' });
    await seedDatabase(AppDataSource); // Call the seeding function
    redisClient.on('error', (err) => logger.error('Redis Client Error', { filePath: __filename, functionName: 'redisClient.on', details: err }));
    redisClient.connect();
    app.listen(port, () => {
      logger.info(`Server is listening on port ${port}`, { filePath: __filename, functionName: 'app.listen' });
    });
  })
  .catch((err) => {
    console.log('Err', err);
    logger.error('Error during Data Source initialization:', { filePath: __filename, functionName: 'AppDataSource.initialize', details: err });
  });
