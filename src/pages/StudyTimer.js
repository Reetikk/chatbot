import React, { useState, useEffect } from 'react';
import { useStats } from '../contexts/StatsContext';

const StudyTimer = () => {
  const { incrementStudyTime } = useStats();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('study'); // 'study' or 'break'
  const [sessions, setSessions] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      if (mode === 'study') {
        setSessions(s => s + 1);
        // Add custom minutes to study time when a study session completes
        incrementStudyTime(customMinutes);
        setMode('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setMode('study');
        setTimeLeft(customMinutes * 60); // Back to custom minutes
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'study' ? customMinutes * 60 : 5 * 60);
  };

  const setCustomTimer = () => {
    if (customMinutes > 0 && customMinutes <= 120) {
      setTimeLeft(customMinutes * 60);
      setMode('study');
      setIsActive(false);
      setShowCustomInput(false);
    }
  };

  const presetTimes = [15, 25, 30, 45, 60];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Study Timer ⏰
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use the Pomodoro Technique to boost your focus
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Timer Presets */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Timer Presets</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {presetTimes.map(time => (
                <button
                  key={time}
                  onClick={() => {
                    setCustomMinutes(time);
                    setTimeLeft(time * 60);
                    setMode('study');
                    setIsActive(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    customMinutes === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {time}m
                </button>
              ))}
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                Custom
              </button>
            </div>

            {/* Custom Timer Input */}
            {showCustomInput && (
              <div className="flex justify-center items-center space-x-3 mb-4">
                <input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="120"
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-gray-100"
                />
                <span className="text-gray-600 dark:text-gray-400">minutes</span>
                <button
                  onClick={setCustomTimer}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Set Timer
                </button>
              </div>
            )}
          </div>

          <div className={`text-8xl font-mono font-bold mb-8 ${
            mode === 'study' ? 'text-blue-600' : 'text-green-600'
          }`}>
            {formatTime(timeLeft)}
          </div>

          <div className="mb-8">
            <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
              mode === 'study' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {mode === 'study' ? '📚 Study Time' : '☕ Break Time'}
            </span>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isActive ? '⏸️ Pause' : '▶️ Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              🔄 Reset
            </button>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Sessions completed: <span className="font-bold text-blue-600">{sessions}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Current session: {customMinutes} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
