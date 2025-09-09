import React, { createContext, useContext, useState, useEffect } from 'react';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    studyTime: 0, // in minutes
    questionsAsked: 0,
    notesCreated: 0,
    quizzesTaken: 0,
    imagesGenerated: 0
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('studyStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(prev => ({ ...prev, ...parsedStats }));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyStats', JSON.stringify(stats));
  }, [stats]);

  const updateStats = (statType, increment = 1) => {
    setStats(prev => ({
      ...prev,
      [statType]: prev[statType] + increment
    }));
  };

  const incrementStudyTime = (minutes) => {
    updateStats('studyTime', minutes);
  };

  const incrementQuestionsAsked = () => {
    updateStats('questionsAsked');
  };

  const incrementNotesCreated = () => {
    updateStats('notesCreated');
  };

  const decrementNotesCreated = () => {
    setStats(prev => ({
      ...prev,
      notesCreated: Math.max(0, prev.notesCreated - 1)
    }));
  };

  const incrementQuizzesTaken = () => {
    updateStats('quizzesTaken');
  };

  const incrementImagesGenerated = () => {
    updateStats('imagesGenerated');
  };

  const resetStats = () => {
    const initialStats = {
      studyTime: 0,
      questionsAsked: 0,
      notesCreated: 0,
      quizzesTaken: 0,
      imagesGenerated: 0
    };
    setStats(initialStats);
    localStorage.setItem('studyStats', JSON.stringify(initialStats));
  };

  const value = {
    stats,
    incrementStudyTime,
    incrementQuestionsAsked,
    incrementNotesCreated,
    decrementNotesCreated,
    incrementQuizzesTaken,
    incrementImagesGenerated,
    resetStats
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsContext;
