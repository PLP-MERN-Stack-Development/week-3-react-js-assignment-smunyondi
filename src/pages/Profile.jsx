import React, { useState } from "react";

const initialProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "User",
  stats: {
    tasks: 12,
    posts: 5
  },
  avatar: null
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setEditing(false);
    // Here you would normally save to backend
  };

  const handleLogout = () => {
    // Add logout logic here
    alert("Logged out!");
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mb-2">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-indigo-400">{profile.name[0]}</span>
          )}
        </div>
        {editing && (
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="mb-2" />
        )}
      </div>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold">Name:</span>
          {editing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
              required
            />
          ) : (
            <span className="block text-lg text-gray-800">{profile.name}</span>
          )}
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold">Email:</span>
          {editing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
              required
            />
          ) : (
            <span className="block text-lg text-gray-800">{profile.email}</span>
          )}
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold">Role:</span>
          <span className="block text-lg text-gray-800">{profile.role}</span>
        </div>
        <div className="mb-4 flex gap-8">
          <div>
            <span className="block text-gray-500 text-sm">Tasks</span>
            <span className="block text-xl font-bold text-indigo-600">{profile.stats.tasks}</span>
          </div>
          <div>
            <span className="block text-gray-500 text-sm">Posts</span>
            <span className="block text-xl font-bold text-indigo-600">{profile.stats.posts}</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold">Change Password:</span>
          {editing ? (
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border rounded px-3 py-1 w-full"
              placeholder="New password"
            />
          ) : (
            <span className="block text-gray-400 italic">********</span>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          {editing ? (
            <>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
              <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={() => setEditing(true)}>Edit</button>
          )}
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-auto" onClick={handleLogout}>Logout</button>
        </div>
      </form>
      <div className="mt-8 text-gray-500 text-sm">This is a sample profile page. You can customize it as needed.</div>
    </div>
  );
};

export default Profile;
