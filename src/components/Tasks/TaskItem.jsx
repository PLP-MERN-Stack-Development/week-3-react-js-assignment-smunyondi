import React from 'react';

const TaskItem = ({ task, onComplete, onDelete }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onComplete(task.id)}
                    className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-300"
                    aria-label={`Mark "${task.title}" as completed`}
                />
                <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition focus:outline-none focus:ring-2 focus:ring-red-300"
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;