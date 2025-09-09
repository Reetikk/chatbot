import React, { useState } from 'react';
import aiService from '../services/aiService';

const VoiceControls = ({ message, onImageGenerate }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      aiService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const utterance = aiService.speak(message.text);
      if (utterance) {
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
      }
    }
  };

  const handleGenerateImage = async () => {
    if (isGeneratingImage) return;
    
    setIsGeneratingImage(true);
    try {
      // Create a more descriptive prompt for image generation
      const imagePrompt = `Educational illustration: ${message.text}`;
      console.log('Generating image with enhanced prompt:', imagePrompt);
      
      const result = await aiService.generateImage(imagePrompt);
      console.log('Image generation result:', result);
      
      onImageGenerate(result);
    } catch (error) {
      console.error('Image generation error:', error);
      // Show error to user
      onImageGenerate({
        success: false,
        message: 'Failed to generate image. Please try again.',
        error: error.message
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  if (message.sender !== 'bot') return null;

  return (
    <div className="flex items-center space-x-2 mt-2">
      {aiService.isSpeechSupported() && (
        <button
          onClick={handleSpeak}
          className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
          title={isSpeaking ? "Stop speaking" : "Read aloud"}
        >
          {isSpeaking ? (
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776z" clipRule="evenodd" />
              <path d="M11.293 5.293a1 1 0 011.414 0 6.5 6.5 0 010 9.414 1 1 0 01-1.414-1.414 4.5 4.5 0 000-6.586 1 1 0 010-1.414z" />
              <path d="M13.707 3.879a1 1 0 011.414 0 10.5 10.5 0 010 14.842 1 1 0 01-1.414-1.414 8.5 8.5 0 000-12.014 1 1 0 010-1.414z" />
            </svg>
          )}
        </button>
      )}
      
      <button
        onClick={handleGenerateImage}
        disabled={isGeneratingImage}
        className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200 disabled:opacity-50"
        title="Generate image from text"
      >
        {isGeneratingImage ? (
          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default VoiceControls;
