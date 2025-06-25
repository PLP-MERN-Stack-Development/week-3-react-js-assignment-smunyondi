import React from 'react';

const Footer = () => (
  <footer className="bg-blue-700 text-white text-center py-3 mt-8 rounded-b-2xl shadow">
    <div>
      &copy; {new Date().getFullYear()} Personal Task & Quote Dashboard. All rights reserved.
    </div>
    <div className="mt-1">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">GitHub</a>
    </div>
  </footer>
);

export default Footer;