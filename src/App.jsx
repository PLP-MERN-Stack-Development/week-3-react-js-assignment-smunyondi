import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TasksProvider } from './context/TasksContext';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './pages';
import {Footer } from './components';
import AddNew from "./components/AddNew";
import NewTask from "./components/NewTask";
import PostsList from "./components/Posts/PostsList";
import { TaskList } from './components/Tasks';
import Calendar from "./components/Calendar";
import Settings from "./components/Settings";
import Alarm from "./components/Alarm";
import { Profile } from './components';

function App() {
  // Use state to track sign-in status
  const [isSignedIn, setIsSignedIn] = useState(() => !!(localStorage.getItem('profileName') && localStorage.getItem('profileEmail')));

  useEffect(() => {
    // Listen for localStorage changes (e.g., from Profile component or other tabs)
    const handleStorage = () => {
      setIsSignedIn(!!(localStorage.getItem('profileName') && localStorage.getItem('profileEmail')));
    };
    window.addEventListener('storage', handleStorage);
    // Optionally, listen for custom events in the same tab
    window.addEventListener('profileChange', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('profileChange', handleStorage);
    };
  }, []);

  return (
    <ThemeProvider>
      <TasksProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-100">
            {/* Show Profile modal if not signed in */}
            {!isSignedIn && <Profile />}
            {/* Blur background when not signed in */}
            <div className={`flex flex-1${!isSignedIn ? ' filter blur-sm pointer-events-none select-none' : ''}`}>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/alarm" element={<Alarm />} />
                  <Route path="/add" element={<AddNew />} />
                  <Route path="/add-task" element={<NewTask />} />
                  <Route path="/add-post" element={<PostsList />} />
                  <Route path="/posts" element={<PostsList />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;