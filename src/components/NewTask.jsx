import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const TAGS = ['Meeting', 'Design', 'Planner', 'Security', 'Survey', 'Builder'];
const MEMBERS = [
  { name: 'Adam', color: 'bg-blue-200 text-blue-800' },
  { name: 'Cindy', color: 'bg-purple-200 text-purple-800' },
];

const NewTask = ({ onClose }) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [members, setMembers] = useState(MEMBERS);
  const [newMember, setNewMember] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleTag = tag => {
    setSelectedTags(tags =>
      tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]
    );
  };

  const toggleMember = name => {
    setSelectedMembers(selected =>
      selected.includes(name)
        ? selected.filter(m => m !== name)
        : [...selected, name]
    );
  };

  const handleCreateTask = () => {
    const taskMembers = members.filter(m => selectedMembers.includes(m.name));
    addTask(
      title,
      desc,
      'Today',
      'bg-blue-600',
      taskMembers,
      selectedTags
    );
    setTitle('');
    setDesc('');
    setSelectedTags([]);
    setSelectedMembers([]);
    setMembers(MEMBERS);
  };

  const handleAddMember = () => {
    const name = newMember.trim();
    if (!name || members.some(m => m.name === name)) return;
    setMembers([...members, { name, color: 'bg-gray-200 text-gray-800' }]);
    setSelectedMembers(selected => [...selected, name]);
    setNewMember('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleCreateTask();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          maxLength={100}
          placeholder="Task Title Here"
        />
      </div>
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-y min-h-[48px] max-h-60"
        placeholder="Task Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        rows={3}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selectedTags.includes(tag)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-blue-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <span className="block mb-2 text-sm font-semibold text-gray-500">Add Members</span>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4 items-stretch">
          {members.map(member => (
            <button
              key={member.name}
              type="button"
              onClick={() => toggleMember(member.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition
                ${selectedMembers.includes(member.name)
                  ? `${member.color} border-blue-600 ring-2 ring-blue-300`
                  : `bg-gray-100 text-gray-600 border-gray-200 hover:bg-blue-100`
                }`}
              style={{ outline: 'none' }}
            >
              {member.name}
            </button>
          ))}
          <input
            type="text"
            className="w-24 px-2 py-1 border rounded text-xs"
            placeholder="Add member"
            value={newMember}
            onChange={e => setNewMember(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddMember()}
          />
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold hover:bg-blue-300 transition"
            onClick={handleAddMember}
            aria-label="Add member"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 shadow"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default NewTask;