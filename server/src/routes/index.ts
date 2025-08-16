import { Router } from 'express';
import { getVoices } from '@controllers/VoiceController';
import { createPrompt } from '@controllers/PromptController';

const router = Router();

router.get('/voices', getVoices);
router.post('/prompts', createPrompt);

export default router;
