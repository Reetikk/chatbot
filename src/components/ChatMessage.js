import React from 'react';
import VoiceControls from './VoiceControls';

const ChatMessage = ({ message, onImageGenerate }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
      }`}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        {message.image && (
          <div className="mt-3">
            {message.image.success && message.image.imageUrl ? (
              <div className="space-y-2">
                <div className="relative group">
                  <img 
                    src={message.image.imageUrl} 
                    alt={message.image.prompt || "Generated image"}
                    className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden p-3 bg-red-50 dark:bg-red-900/30 rounded-lg text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Failed to load image</span>
                    </div>
                  </div>
                  {/* Image overlay with download button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => window.open(message.image.imageUrl, '_blank')}
                      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      View Full Size
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg text-sm border border-purple-200 dark:border-purple-700">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-purple-700 dark:text-purple-300">{message.image.message}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-sm border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-yellow-700 dark:text-yellow-300">
                    {message.image.placeholder || message.image.message || "🎨 Image generation in progress..."}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-1">
          <p className={`text-xs ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <VoiceControls message={message} onImageGenerate={onImageGenerate} />
      </div>
    </div>
  );
};

export default ChatMessage;
