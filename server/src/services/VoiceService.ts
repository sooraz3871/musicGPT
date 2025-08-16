import { VoiceRepository } from '@repositories/VoiceRepository';
import { redisClient } from '@config/redis';

import logger from '@config/logger';

export class VoiceService {
  /**
   * Gets the voices with pagination and caching.
   * @param page - The page number.
   * @param limit - The number of items per page.
   * @returns The voices and pagination data.
   */
  async getVoices(page: number, limit: number) {
    const cacheKey = `voices:${page}:${limit}`;
    logger.info(`Attempting to fetch voices for page ${page} with limit ${limit}`, { filePath: __filename, functionName: 'getVoices' });
    const cachedVoices = await redisClient.get(cacheKey);

    if (cachedVoices) {
      logger.info('Voices found in cache', { filePath: __filename, functionName: 'getVoices' });
      return JSON.parse(cachedVoices);
    }

    logger.info('Voices not found in cache, fetching from database', { filePath: __filename, functionName: 'getVoices' });
    const [voices, total] = await VoiceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    logger.info(`Fetched ${voices.length} voices from database, total: ${total}`, { filePath: __filename, functionName: 'getVoices' });
    const data = {
      voices,
      total,
      page,
      limit,
    };

    await redisClient.set(cacheKey, JSON.stringify(data), {
      EX: 3600, // cache for 1 hour
    });
    logger.info('Voices cached successfully', { filePath: __filename, functionName: 'getVoices' });

    return data;
  }
}
