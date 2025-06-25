import React from "react";
import { Link } from "react-router-dom";

const AddNew = () => (
  <div className="max-w-md mx-auto bg-white rounded shadow p-6">
    <h2 className="text-xl font-bold mb-4">Add New</h2>
    <div className="flex flex-col gap-4">
      <Link
        to="/add-task"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Task
      </Link>
      <Link
        to="/add-post"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Post
      </Link>
    </div>
  </div>
);

export default AddNew;