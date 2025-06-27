import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onLogout }) => {
  // Get name from localStorage or fallback
  const name = localStorage.getItem('profileName') || 'James Smith';
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="shadow-lg bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full">
          {/* Logo */}
          <img src="/PoTaSQ.png" alt="Logo" className="h-20 w-20 object-contain" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
          </div>
          {/* Theme Toggle Button - right aligned and small */}
          <button
            onClick={toggleTheme}
            className="ml-auto px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
            aria-label="Toggle dark mode"
          >
            <span className={`text-lg transition-transform duration-300 ${theme === 'dark' ? 'rotate-0' : 'rotate-180'}`}>{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>
        </div>
        {/* Greetings and Logout */}
        <div className="text-right flex flex-col items-end gap-2">
          <div className="text-gray-500 text-sm">Welcome</div>
          <div className="font-semibold text-gray-700">{name}</div>
          {onLogout && (
            <button
              className="mt-1 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;