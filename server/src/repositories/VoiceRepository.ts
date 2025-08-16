import { AppDataSource } from '@config/data-source';
import { Voice } from '@entities/Voice';

export const VoiceRepository = AppDataSource.getRepository(Voice);
