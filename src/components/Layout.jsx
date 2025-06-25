import React from 'react';
import { Navbar, Sidebar, Footer } from './'; // Importing from components/index.js in the same folder

const Layout = ({ children }) => (
  <div className="app-layout">
    <Navbar />
    <Sidebar />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);


export default Layout;