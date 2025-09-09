import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { StatsProvider } from './contexts/StatsContext';
import Navigation from './components/Navigation';
// import CGCNotesButton from './components/CGCNotesButton';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';
import StudyTimer from './pages/StudyTimer';
import QuizGenerator from './pages/QuizGenerator';
import Notes from './pages/Notes';
import StudyTools from './pages/StudyTools';
import './App.css';

// Component to conditionally render CGC Notes button
const CGCNotesWrapper = ({ showCGCInNavbar, handleCGCCancel }) => {
  const location = useLocation();
  
  // Only show on front page (ChatPage) which is "/"
  if (location.pathname !== '/' || showCGCInNavbar) {
    return null;
  }
  
  // return <CGCNotesButton onCancel={handleCGCCancel} />;
  return null; // Temporarily return null since CGCNotesButton is commented out
};

function App() {
  const [showCGCInNavbar, setShowCGCInNavbar] = useState(false);

  const handleCGCCancel = () => {
    setShowCGCInNavbar(true);
  };

  return (
    <ThemeProvider>
      <StatsProvider>
        <Router>
          <div className="min-h-screen">
            <Navigation showCGCInNavbar={showCGCInNavbar} />
            {/* <CGCNotesWrapper showCGCInNavbar={showCGCInNavbar} handleCGCCancel={handleCGCCancel} /> */}
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
