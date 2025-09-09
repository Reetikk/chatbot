import React, { useState } from 'react';
import aiService from '../services/aiService';
import { useStats } from '../contexts/StatsContext';

const QuizGenerator = () => {
  const { incrementQuizzesTaken } = useStats();
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Generate 5 multiple choice questions about ${topic}. Format as JSON with structure: {"questions": [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0}]}`;
      const response = await aiService.getAIResponse(prompt);
      
      // Try to parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const quizData = JSON.parse(jsonMatch[0]);
        setQuestions(quizData.questions || []);
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowResults(false);
      } else {
        // Fallback: create sample questions
        const sampleQuestions = [
          {
            question: `What is a key concept in ${topic}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0
          },
          {
            question: `Which statement about ${topic} is correct?`,
            options: ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
            correct: 1
          }
        ];
        setQuestions(sampleQuestions);
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Increment quiz counter when quiz is completed
      incrementQuizzesTaken();
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Quiz Generator 🧠
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge on any topic
          </p>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                What would you like to be quizzed on?
              </h2>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., World History, Biology, Math)"
                className="w-full max-w-md px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 mb-6"
              />
              <button
                onClick={generateQuiz}
                disabled={!topic.trim() || isGenerating}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-200"
              >
                {isGenerating ? '🔄 Generating...' : '🚀 Generate Quiz'}
              </button>
            </div>
          </div>
        ) : showResults ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Quiz Complete! 🎉
            </h2>
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {calculateScore()}/{questions.length}
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              {calculateScore() === questions.length ? 'Perfect Score!' : 
               calculateScore() >= questions.length * 0.8 ? 'Great Job!' : 
               calculateScore() >= questions.length * 0.6 ? 'Good Effort!' : 'Keep Studying!'}
            </p>
            <button
              onClick={() => {
                setQuestions([]);
                setTopic('');
                setShowResults(false);
              }}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              🔄 Take Another Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  Topic: {topic}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              {questions[currentQuestion]?.question}
            </h2>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    userAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <span className="font-semibold text-blue-600 mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">{option}</span>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={nextQuestion}
                disabled={userAnswers[currentQuestion] === undefined}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-200"
              >
                {currentQuestion === questions.length - 1 ? '🏁 Finish Quiz' : '➡️ Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
