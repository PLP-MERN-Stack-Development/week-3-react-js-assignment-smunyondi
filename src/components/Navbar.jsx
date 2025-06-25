import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <span className="font-bold text-lg">Task & Quote Dashboard</span>
      <div className="space-x-4 flex items-center">
        <a href="/" className="hover:underline">Home</a>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded bg-blue-900 hover:bg-blue-800 transition"
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;