import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import Tabs from '../Tabs';

const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [tabState, setTabState] = useState("all");
  const [search, setSearch] = useState("");

  // Filter tasks based on tabState and search
  const filteredTasks = tasks
    .filter(task => {
      if (tabState === "in-progress") return !task.completed;
      if (tabState === "completed") return task.completed;
      return true; // "all" or any other tab
    })
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  // Group tasks by day
  const grouped = filteredTasks.reduce((acc, task) => {
    acc[task.day] = acc[task.day] || [];
    acc[task.day].push(task);
    return acc;
  }, {});

  // Calculate progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 tracking-tight">
        Tasks
      </h2>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-700 dark:text-gray-200 font-semibold">{percent}% Task Completed</span>
          <span className="text-sm text-indigo-600 font-bold">{completedTasks}/{totalTasks}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Tasks</h2>
      <Tabs
        tabs={[
          { label: "All", value: "all" },
          { label: "In Progress", value: "in-progress" },
          { label: "Completed", value: "completed" },
          { label: "Today", value: "today" }, // Example: add more tabs
        ]}
        activeTab={tabState}
        onTabChange={setTabState}
        searchValue={search}
        onSearchChange={setSearch}
      />
      {Object.entries(grouped).map(([day, tasks]) => (
        <div key={day} className="mb-4">
          <div className="text-xs text-gray-400 mb-2">{day}</div>
          <ul className="flex flex-col gap-3">
            {tasks.map((task, idx) => (
              <li
                key={task.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-base ${
                    task.color || 'bg-blue-600'
                  }`}
                >
                  {task.number || idx + 1}
                </span>
                <div className="flex-1" onClick={() => setSelectedTask(task)}>
                  <div
                    className={`font-semibold text-base ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {task.title || 'Untitled Task'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    {task.desc || 'No description.'}
                  </div>
                  {/* Show assigned members */}
                  {Array.isArray(task.members) && task.members.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-1">
                      {task.members.map(member => (
                        <span
                          key={member.name}
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${member.color || 'bg-gray-200 text-gray-800'}`}
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-300"
                  aria-label={`Mark "${task.title}" as completed`}
                />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={() => setSelectedTask(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setSelectedTask(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedTask.title}</h3>
            <div className="mb-2 text-gray-500 break-words max-h-40 overflow-y-auto">{selectedTask.desc}</div>
            <div className="mb-2">
              <span className="font-semibold text-sm text-gray-400">Day:</span> {selectedTask.day}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sm text-gray-400">Tags:</span>
              {selectedTask.tags && selectedTask.tags.length > 0
                ? selectedTask.tags.map(tag => (
                    <span key={tag} className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{tag}</span>
                  ))
                : <span className="ml-2 text-xs text-gray-400">None</span>
              }
            </div>
            <div>
              <span className="font-semibold text-sm text-gray-400">Members:</span>
              {selectedTask.members && selectedTask.members.length > 0
                ? selectedTask.members.map(member => (
                    <span
                      key={member.name}
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${member.color || 'bg-gray-200 text-gray-800'}`}
                    >
                      {member.name}
                    </span>
                  ))
                : <span className="ml-2 text-xs text-gray-400">None</span>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;