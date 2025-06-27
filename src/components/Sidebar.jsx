import React, { useRef, useState, useEffect } from "react";
import { FaHome, FaCalendarAlt, FaFileAlt, FaCog, FaBell, FaPlus, FaUser, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Main sidebar icons (excluding Add)
  const icons = [
    { icon: <FaHome />, label: "Home", onClick: () => navigate("/") },
    { icon: <FaCalendarAlt />, label: "Calendar", onClick: () => navigate("/calendar") },
    { icon: <FaFileAlt />, label: "Posts", onClick: () => navigate("/posts") },
    { icon: <FaCog />, label: "Settings", onClick: () => navigate("/settings") },
    { icon: <FaBell />, label: "Alarm", onClick: () => navigate("/alarm") },
  ];

  // Dropdown icons (icons only, no labels)
  const dropdownIcons = [
    { icon: <FaUser />, onClick: () => { setDropdownOpen(false); navigate("/profile"); } },
    { icon: <FaTasks />, onClick: () => { setDropdownOpen(false); navigate("/tasks"); } },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className="flex flex-col items-center bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen w-16 py-4 shadow-sm transition-colors duration-300">
      {/* Logo at the top, clickable to go home */}
      <button onClick={() => navigate("/")}
        className="focus:outline-none mb-6">
        <img src="/PoTaSQ.png" alt="Logo" className="h-12 w-12 object-contain" />
      </button>
      {icons.map(({ icon, label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="my-4 text-xl text-indigo-600 hover:bg-indigo-100 focus:bg-indigo-200 rounded-full p-3 transition-colors duration-200 cursor-pointer focus:outline-none"
          title={label}
          aria-label={label}
        >
          {icon}
        </button>
      ))}
      {/* Add icon with dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="my-4 text-xl text-indigo-600 hover:bg-indigo-100 focus:bg-indigo-200 rounded-full p-3 transition-colors duration-200 cursor-pointer focus:outline-none"
          title="Add"
          aria-label="Add"
        >
          <FaPlus />
        </button>
        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center bg-white border rounded-lg shadow-lg z-50 p-2">
            {dropdownIcons.map(({ icon, onClick }, idx) => (
              <button
                key={idx}
                onClick={onClick}
                className="text-xl text-indigo-600 hover:bg-indigo-100 rounded-full p-3 transition-colors duration-200 focus:outline-none"
                aria-label={`Dropdown Icon ${idx}`}
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;