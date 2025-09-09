import React from 'react';

const WelcomeScreen = ({ onStartChat }) => {
  const quickQuestions = [
    "Help me with math homework",
    "Explain photosynthesis",
    "What is the French Revolution?",
    "Grammar rules in English",
    "Study tips for exams",
    "Science project ideas"
  ];

  const handleQuickQuestion = (question) => {
    // This would typically set the input value and send the message
    onStartChat();
  };

  return (
    <div className="text-center py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
          <span className="text-white text-4xl">🎓</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Welcome to StudyBot
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Your intelligent study companion powered by AI. Ask questions, get explanations, 
          and explore any topic to enhance your learning journey.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Study Help</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Get help with homework, assignments, and understanding complex topics across all subjects.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Smart Explanations</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Receive clear, easy-to-understand explanations tailored to your learning level.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Instant Answers</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Get quick responses to your questions and continue learning without interruption.</p>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Try asking about:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 text-left"
            >
              "{question}"
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
        <p className="text-blue-100 mb-6">
          Type your question below and let's explore knowledge together!
        </p>
        <button
          onClick={onStartChat}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
