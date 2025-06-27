import React from 'react';

const Footer = () => (
  <footer className="bg-blue-700 dark:bg-gray-900 text-white dark:text-gray-100 text-center py-3 mt-8 rounded-b-2xl shadow transition-colors duration-300">
    <div>
      &copy; {new Date().getFullYear()} Personal Task & Quote Dashboard. All rights reserved.
    </div>
    <div className="mt-1">
      <a href="https://github.com/PLP-MERN-Stack-Development/week-3-react-js-assignment-smunyondi.git" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200 dark:hover:text-blue-400">GitHub</a>
    </div>
  </footer>
);

export default Footer;