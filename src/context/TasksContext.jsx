import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (
    title,
    desc = '',
    day = 'Today',
    color = 'bg-blue-600',
    members = [],
    tags = []
  ) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title: title || 'Untitled Task',
        desc: desc || 'No description provided.',
        day,
        color,
        members,
        tags,
        completed: false
      }
    ]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearTasks = () => setTasks([]);

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, clearTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

// Optional: custom hook for convenience
export const useTasksContext = () => useContext(TasksContext);