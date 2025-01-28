// File: src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from JSON server
  useEffect(() => {
    
      axios.get("http://localhost:3001/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch(() => toast.error("Failed to load tasks."));
  }, []);

  // Mark task as done or not done
  const toggleStatus = (id, currentStatus) => {
    
      axios.post(`http://localhost:3001/tasks/${id}`, { status: !currentStatus })
      .then(() => {
        toast.success("Task status updated!");
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: !currentStatus } : task
          )
        );
      })
      .catch(() => toast.error("Failed to update status."));
  };

  // Delete task by ID
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        toast.success("Task deleted successfully!");
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => toast.error("Failed to delete task."));
  };

  return (
    <div>
      <h2>Task List</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.date}</td>
              <td>{task.taskName}</td>
              <td>{task.status ? "Done" : "Not Done"}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => toggleStatus(task.id, task.status)}
                >
                  {task.status ? "Mark as Not Done" : "Mark as Done"}
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;