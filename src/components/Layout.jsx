import React from 'react';
import { Navbar, Sidebar, Footer } from './'; // Importing from components/index.js in the same folder

const Layout = ({ children }) => (
  <div className="app-layout bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
    <Navbar />
    <Sidebar />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);


export default Layout;