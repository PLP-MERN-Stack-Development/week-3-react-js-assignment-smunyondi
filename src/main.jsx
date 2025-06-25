import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- note the '/client'
import App from './App';
import { TasksProvider } from './context/TasksContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);