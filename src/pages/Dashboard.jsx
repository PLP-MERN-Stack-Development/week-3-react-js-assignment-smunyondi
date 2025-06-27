import React, { useState } from "react";
import { Sidebar } from "../components";
import { TaskCards, TaskList } from "../components/Tasks";
import { PostsList } from "../components/Posts";
import { Schedule, NewTask, Header } from "../components";
import { QuoteBox } from "../components/Quotes";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profileName');
    localStorage.removeItem('profileEmail');
    localStorage.removeItem('profilePassword');
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:border-blue-600">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen w-20 z-40">
        <Sidebar />
      </div>

      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div
          className="dark:bg-gray-900 dark:border-blue-600 fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-4"
        >
          <button
            className="self-end mb-4 text-gray-500 hover:text-red-500 text-2xl"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row lg:ml-20 dark:bg-gray-900 dark:border-blue-600">
        <main className="flex-1 p-4 sm:p-6">
          <Header onLogout={handleLogout} />
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-900 dark:border-blue-600">
            <TaskCards />
          </div>
          <div className="mb-4 sm:mb-6 dark:bg-gray-900 dark:border-blue-600">
            <QuoteBox />
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-900 dark:border-blue-600">
            <TaskList />
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 dark:bg-gray-900 dark:border-blue-600">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Posts</h2>
            <PostsList gridCols="grid-cols-1 sm:grid-cols-2 " />
          </div>
        </main>
        {/* Aside for desktop */}
        <aside className="w-full max-w-xs bg-white border-l shadow-lg p-4 sm:p-6 hidden md:block dark:bg-gray-900 dark:border-blue-600">
          <section className="mb-8">
            <Schedule />
          </section>
          <section>
            <NewTask />
          </section>
        </aside>
      </div>
      {/* Aside for mobile */}
      <div className="block md:hidden p-4">
        <Schedule />
        <div className="mt-4">
          <NewTask />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;