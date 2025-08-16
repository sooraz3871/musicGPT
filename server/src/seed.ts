import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Voice } from '@entities/Voice';
import logger from '@config/logger';

const voices: { name: string; type: string }[] = Array.from({ length: 100 }, (_, i) => ({
  name: `Voice ${i + 1}`,
  type: 'tts',
}));

export const seedDatabase = async (dataSource: DataSource) => {
  try {
    const voiceRepository = dataSource.getRepository(Voice);
    const voiceCount = await voiceRepository.count();

    if (voiceCount === 0) {
      await voiceRepository.save(voices);
      logger.info('Voices have been seeded successfully.', { filePath: __filename, functionName: 'seedDatabase' });
    } else {
      logger.info('Voices already exist in the database. Skipping seeding.', { filePath: __filename, functionName: 'seedDatabase' });
    }
  } catch (err) {
    logger.error('Error during database seeding:', { filePath: __filename, functionName: 'seedDatabase', details: err });
  }
};
