import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { HiOutlineUserGroup } from 'react-icons/hi';

const CARD_COLORS = [
  'from-indigo-500 via-blue-400 to-blue-300',
  'from-pink-500 via-red-400 to-yellow-300',
  'from-green-500 via-teal-400 to-cyan-300'
];

const TaskCards = () => {
  const { tasks } = useTasks();
  const latestTasks = [...tasks].reverse().slice(0, 3);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {latestTasks.map((task, idx) => (
          <button
            key={task.id || idx}
            className={`flex flex-col bg-gradient-to-br ${CARD_COLORS[idx % CARD_COLORS.length]} rounded-2xl shadow-xl p-6 sm:p-8 transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none`}
            onClick={() => setSelectedTask(task)}
            tabIndex={0}
            type="button"
          >
            <h3 className="font-bold text-lg sm:text-xl text-white mb-2 truncate">{task.title}</h3>
            <p className="text-white/90 text-sm sm:text-base mb-4 overflow-hidden break-words" style={{maxHeight: '4.5em'}}>
              {task.desc || task.description || 'No description.'}
            </p>
            {Array.isArray(task.tags) && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto mb-2">
                {task.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full font-semibold shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <HiOutlineUserGroup className="text-white/80" />
              <span className="text-xs text-white/80 font-medium">
                {Array.isArray(task.members) ? task.members.length : (task.avatars || 1)} member{(Array.isArray(task.members) ? task.members.length : (task.avatars || 1)) !== 1 ? 's' : ''}
              </span>
            </div>
          </button>
        ))}
      </div>
      {/* Modal for viewing task details */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={() => setSelectedTask(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setSelectedTask(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedTask.title}</h3>
            <div className="mb-2 text-gray-500 break-words max-h-40 overflow-y-auto">{selectedTask.desc || selectedTask.description}</div>
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
    </>
  );
};

export default TaskCards;