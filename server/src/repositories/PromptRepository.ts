import { AppDataSource } from '@config/data-source';
import { Prompt } from '@entities/Prompt';

export const PromptRepository = AppDataSource.getRepository(Prompt);
