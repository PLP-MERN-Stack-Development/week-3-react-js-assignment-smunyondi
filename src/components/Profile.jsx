import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const getStoredProfile = () => {
  const storedName = localStorage.getItem('profileName');
  const storedEmail = localStorage.getItem('profileEmail');
  return storedName && storedEmail ? { name: storedName, email: storedEmail } : null;
};

const Profile = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(!!getStoredProfile());
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate a user database in localStorage
  const saveUser = (name, email, password) => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profilePassword', password); // Not secure, for demo only
  };
  const checkUser = (email, password) => {
    return (
      localStorage.getItem('profileEmail') === email &&
      localStorage.getItem('profilePassword') === password
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      saveUser(name, email, password);
      setSignedIn(true);
      setError("");
      window.location.reload();
      // navigate("/");
    } else {
      setError("All fields are required.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (checkUser(email, password)) {
      setSignedIn(true);
      setError("");
      window.location.reload();
      // navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('profileName');
    localStorage.removeItem('profileEmail');
    localStorage.removeItem('profilePassword');
    setSignedIn(false);
    setName("");
    setEmail("");
    setPassword("");
    setMode('login');
  };

  // If on /profile route, show profile details or login/signup modal
  if (location.pathname === "/profile") {
    if (!signedIn) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-semibold rounded-l ${mode === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setMode('login'); setError(""); }}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 font-semibold rounded-r ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setMode('signup'); setError(""); }}
              >
                Sign Up
              </button>
            </div>
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    className="border rounded px-3 py-2 w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    className="border rounded px-3 py-2 w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold mt-4"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    className="border rounded px-3 py-2 w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    className="border rounded px-3 py-2 w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold mt-4"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      );
    }
    // Show sidebar and profile details
    const storedName = localStorage.getItem('profileName');
    const storedEmail = localStorage.getItem('profileEmail');
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="hidden lg:block fixed top-0 left-0 h-screen w-20 z-40">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center lg:ml-20">
          <div className="max-w-md mx-auto mt-20 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-indigo-700">Profile Details</h1>
            <div className="mb-4">
              <div className="text-lg font-semibold">Name:</div>
              <div className="mb-2">{storedName}</div>
              <div className="text-lg font-semibold">Email:</div>
              <div>{storedEmail}</div>
            </div>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    );
  }

  // After sign in, redirect handled above, so render nothing
  if (!signedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 font-semibold rounded-l ${mode === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => { setMode('login'); setError(""); }}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-r ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => { setMode('signup'); setError(""); }}
            >
              Sign Up
            </button>
          </div>
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="border rounded px-3 py-2 w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  className="border rounded px-3 py-2 w-full"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold mt-4"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="border rounded px-3 py-2 w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  className="border rounded px-3 py-2 w-full"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold mt-4"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Profile;
