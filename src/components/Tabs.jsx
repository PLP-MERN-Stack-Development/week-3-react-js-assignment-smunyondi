import React from "react";

const Tabs = ({
  tabs = [
    { label: "All", value: "all" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ],
  activeTab = "all",
  onTabChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search tasks..."
}) => (
  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
    <div className="flex gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto bg-white dark:bg-gray-900 transition-colors duration-300">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`whitespace-nowrap px-3 py-2 rounded-t-lg font-semibold transition
            ${activeTab === tab.value
              ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
              : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          onClick={() => onTabChange && onTabChange(tab.value)}
          aria-current={activeTab === tab.value ? "page" : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <input
      type="text"
      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      placeholder={searchPlaceholder}
      value={searchValue}
      onChange={e => onSearchChange && onSearchChange(e.target.value)}
    />
  </div>
);

export default Tabs;