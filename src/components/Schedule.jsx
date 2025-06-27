import React, { useState } from 'react';

const initialSchedules = [
  {
    color: 'bg-pink-400',
    title: 'Create Infographic Design For Education',
    time: '15:38',
    subtitle: 'Meeting With Company Executive',
    avatars: 3,
  },
  {
    color: 'bg-green-400',
    title: 'Financial Planner Dashboard Application',
    time: '24:57',
    subtitle: 'Meeting With Stakeholder',
    avatars: 3,
  },
];

const Schedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({
    color: 'bg-pink-400',
    title: '',
    time: '',
    subtitle: '',
    avatars: 1,
  });

  // Open form for add or edit
  const openForm = (idx = null) => {
    if (idx !== null) {
      setForm(schedules[idx]);
      setEditIdx(idx);
    } else {
      setForm({ color: 'bg-pink-400', title: '', time: '', subtitle: '', avatars: 1 });
      setEditIdx(null);
    }
    setShowForm(true);
  };

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    if (editIdx !== null) {
      // Edit
      const updated = [...schedules];
      updated[editIdx] = form;
      setSchedules(updated);
    } else {
      // Add
      setSchedules([...schedules, form]);
    }
    setShowForm(false);
  };

  // Handle delete
  const handleDelete = idx => {
    setSchedules(schedules.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 rounded-full p-2 text-xl">📅</span>
          Upcoming Schedule
        </h3>
        <button
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => openForm()}
        >
          <span className="text-xl">＋</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {schedules.map((item, idx) => (
          <div key={idx} className={`rounded-xl p-4 flex flex-col gap-2 text-white shadow ${item.color} dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="font-semibold">{item.title}</div>
              <span className="text-xs font-bold">{item.time}</span>
            </div>
            <div className="text-xs opacity-80">{item.subtitle}</div>
            <div className="flex gap-2 mt-2">
              {[...Array(item.avatars)].map((_, i) => (
                <span key={i} className="w-6 h-6 bg-white/30 rounded-full inline-block"></span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 bg-yellow-400 dark:bg-yellow-600 text-xs rounded hover:bg-yellow-500 dark:hover:bg-yellow-700"
                onClick={() => openForm(idx)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 dark:bg-red-700 text-xs rounded hover:bg-red-600 dark:hover:bg-red-800"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal/Form */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <form
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 transition-colors duration-300"
            onSubmit={handleSubmit}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h4 className="font-bold text-2xl mb-2 text-center">
              {editIdx !== null ? 'Edit Schedule' : 'Add Schedule'}
            </h4>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Title</span>
              <input
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Time</span>
              <input
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Subtitle</span>
              <input
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={e => setForm({ ...form, subtitle: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Color</span>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
              >
                <option value="bg-pink-400">Pink</option>
                <option value="bg-green-400">Green</option>
                <option value="bg-blue-400">Blue</option>
                <option value="bg-yellow-400">Yellow</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Avatars</span>
              <input
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="number"
                min={1}
                max={10}
                placeholder="Avatars"
                value={form.avatars}
                onChange={e => setForm({ ...form, avatars: Number(e.target.value) })}
              />
            </label>
            <div className="flex gap-3 mt-4 justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 font-semibold"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Schedule;