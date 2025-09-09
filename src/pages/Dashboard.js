import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStats } from '../contexts/StatsContext';

const Dashboard = () => {
  const { stats } = useStats();
  const navigate = useNavigate();
  
  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, onClick, color }) => (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:${color}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your learning progress and quick access to study tools.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Study Time"
            value={`${Math.floor(stats.studyTime / 60)}h ${stats.studyTime % 60}m`}
            icon="⏰"
            color="border-blue-500"
          />
          <StatCard
            title="Questions Asked"
            value={stats.questionsAsked}
            icon="❓"
            color="border-green-500"
          />
          <StatCard
            title="Notes Created"
            value={stats.notesCreated}
            icon="📝"
            color="border-yellow-500"
          />
          <StatCard
            title="Quizzes Taken"
            value={stats.quizzesTaken}
            icon="🧠"
            color="border-purple-500"
          />
          <StatCard
            title="Images Generated"
            value={stats.imagesGenerated}
            icon="🎨"
            color="border-pink-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAction
              title="Start Chatting"
              description="Ask questions and get AI-powered answers"
              icon="💬"
              onClick={() => navigate('/chat')}
              color="border-blue-500"
            />
            <QuickAction
              title="Study Timer"
              description="Focus with Pomodoro technique"
              icon="⏰"
              onClick={() => navigate('/timer')}
              color="border-green-500"
            />
            <QuickAction
              title="Take a Quiz"
              description="Test your knowledge on any topic"
              icon="🧠"
              onClick={() => navigate('/quiz')}
              color="border-purple-500"
            />
            <QuickAction
              title="Create Notes"
              description="Organize your study materials"
              icon="📝"
              onClick={() => navigate('/notes')}
              color="border-yellow-500"
            />
            <QuickAction
              title="Study Tools"
              description="Access calculators, converters & more"
              icon="🛠️"
              onClick={() => navigate('/studytools')}
              color="border-red-500"
            />
            <QuickAction
              title="Generate Images"
              description="Create visual learning aids"
              icon="🎨"
              onClick={() => navigate('/chat')}
              color="border-pink-500"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">💬</div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Asked about lions in biology
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">🎨</div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Generated educational image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl">⏰</div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Completed 25-minute study session
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
