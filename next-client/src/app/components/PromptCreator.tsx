'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Plus, ChevronDown, ArrowRight, AudioLines } from "lucide-react";

interface PromptCreatorProps {
  onSubmit: (prompt: string, type: string) => void;
}

const PromptCreator: React.FC<PromptCreatorProps> = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<'instrumental' | 'lyrics'>();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    const promptEl = document.getElementById('create-prompt') as HTMLTextAreaElement;
    if (promptEl?.value) {
      onSubmit(promptEl.value, 'create');
      promptEl.value = ''; // clear after submit
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
      <h2 className="text-2xl font-bold text-center text-white">What song to create?</h2>

      {/* Prompt Box with Buttons Inside */}
      <div className="bg-gray-700 rounded-lg">
        {/* Textarea */}
        <textarea
          id="create-prompt"
          className="w-full p-4 bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400"
          rows={2}
          placeholder="Describe your song"
        ></textarea>

        {/* Buttons inside same box */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center space-x-3">
            {/* Attachment */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 hover:border-gray-400 bg-transparent">
              <Paperclip className="w-5 h-5 text-white" />
            </button>

            {/* Instrumental */}
            <button
              onClick={() => setSelectedOption("instrumental")}
              className={`flex items-center px-4 py-2 rounded-2xl border transition ${
                selectedOption === "instrumental"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-transparent text-white border-gray-500 hover:border-gray-400"
              }`}
            >
              <AudioLines className="w-5 h-5 mr-2" />
              Instrumental
            </button>

            {/* Lyrics */}
            <button
              onClick={() => setSelectedOption("lyrics")}
              className={`flex items-center px-4 py-2 rounded-2xl border transition ${
                selectedOption === "lyrics"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-transparent text-white border-gray-500 hover:border-gray-400"
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Lyrics
            </button>
          </div>

          {/* Tools Dropdown + Submit */}
          <div className="flex items-center space-x-3">
            {/* Tools Menu */}
            <div className="relative z-50" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center text-white px-3 py-2 rounded-lg hover:bg-gray-600"
              >
                Tools <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-600 text-white">
                    Create Anything
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-600 text-white">
                    Text to Speech
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCreator;
