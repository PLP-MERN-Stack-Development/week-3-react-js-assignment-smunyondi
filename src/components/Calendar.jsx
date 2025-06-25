import React from "react";
import Sidebar from "./Sidebar";

const Calendar = () => (
  <div className="flex min-h-screen bg-gray-100">
    <div className="hidden lg:block fixed top-0 left-0 h-screen w-20 z-40">
      <Sidebar />
    </div>
    <main className="flex-1 flex flex-col items-center justify-center lg:ml-20">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center mt-20">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Calendar</h2>
        <p>This page is under construction.</p>
      </div>
    </main>
  </div>
);

export default Calendar;