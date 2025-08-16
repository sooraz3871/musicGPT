import { PromptRepository } from '@repositories/PromptRepository';
import { Prompt } from '@entities/Prompt';
import logger from '@config/logger';

export class PromptService {
  /**
   * Creates a new prompt.
   * @param prompt - The prompt text.
   * @param type - The type of the prompt.
   * @returns The created prompt.
   */
  async createPrompt(prompt: string, type: string) {
    logger.info('Creating new prompt in service', { filePath: __filename, functionName: 'createPrompt' });
    const newPrompt = new Prompt();
    newPrompt.prompt = prompt;
    newPrompt.type = type;

    const savedPrompt = await PromptRepository.save(newPrompt);
    logger.info('Prompt saved to database', { filePath: __filename, functionName: 'createPrompt', promptId: savedPrompt.id });
    return savedPrompt;
  }
}
