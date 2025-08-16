'use client';

import PromptCreator from './components/PromptCreator';
import VoiceList from './components/VoiceList';

export default function Home() {
  const handleSubmit = async (prompt: string, type: string) => {
    try {
      //TODO: use .env for API URL
      await fetch('http://localhost:8000/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      });
    } catch (error) {
      console.error('Failed to submit prompt:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white py-12 space-y-8">
      <div className="w-full max-w-2xl space-y-8">
        <PromptCreator onSubmit={handleSubmit} />
        <VoiceList />
      </div>
    </div>
  );
}
