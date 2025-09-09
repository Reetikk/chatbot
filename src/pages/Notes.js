import React, { useState, useEffect } from 'react';
import { useStats } from '../contexts/StatsContext';

const Notes = () => {
  const { incrementNotesCreated, decrementNotesCreated } = useStats();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', category: 'General' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['General', 'Math', 'Science', 'History', 'Literature', 'Languages', 'Other'];

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
    setNotes(savedNotes);
  }, []);

  const saveNote = () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) return;

    const newNote = {
      id: editingId || Date.now(),
      ...currentNote,
      createdAt: editingId ? notes.find(n => n.id === editingId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedNotes = editingId 
      ? notes.map(note => note.id === editingId ? newNote : note)
      : [...notes, newNote];

    setNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
    
    // Increment note counter only for new notes (not edits)
    if (!editingId) {
      incrementNotesCreated();
    }
    
    setCurrentNote({ title: '', content: '', category: 'General' });
    setIsEditing(false);
    setEditingId(null);
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
    setEditingId(note.id);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
    
    // Decrement note counter when a note is deleted
    decrementNotesCreated();
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Study Notes 📝
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and manage your study materials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Note Editor */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {isEditing ? 'Edit Note' : 'Create New Note'}
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
                
                <select
                  value={currentNote.category}
                  onChange={(e) => setCurrentNote({...currentNote, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                
                <textarea
                  placeholder="Write your notes here..."
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={saveNote}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    {isEditing ? '💾 Update' : '➕ Save Note'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={() => {
                        setCurrentNote({ title: '', content: '', category: 'General' });
                        setIsEditing(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {filteredNotes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No notes yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your first study note to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map(note => (
                  <div key={note.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {note.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                            {note.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editNote(note)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {note.content.length > 200 ? `${note.content.substring(0, 200)}...` : note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
