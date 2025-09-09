import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { StatsProvider } from './contexts/StatsContext';
import Navigation from './components/Navigation';
import CGCNotesButton from './components/CGCNotesButton';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';
import StudyTimer from './pages/StudyTimer';
import QuizGenerator from './pages/QuizGenerator';
import Notes from './pages/Notes';
import StudyTools from './pages/StudyTools';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <StatsProvider>
      <CGCNotesButton />
        <Router>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<ChatPage />} />
              <Route path="/timer" element={<StudyTimer />} />
              <Route path="/quiz" element={<QuizGenerator />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/studytools" element={<StudyTools />} />
            </Routes>
            
          </div>
        </Router>
      </StatsProvider>
    </ThemeProvider>
  );
}

export default App;
