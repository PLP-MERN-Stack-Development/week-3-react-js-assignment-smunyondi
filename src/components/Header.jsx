import React from 'react';

const Header = ({ onLogout }) => {
  // Get name from localStorage or fallback
  const name = localStorage.getItem('profileName') || 'James Smith';
  return (
    <header className=" shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img src="/PoTaSQ.png" alt="Logo" className="h-20 w-20 object-contain" />
          <div>
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <div className="flex items-center gap-2">
            </div>
          </div>
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