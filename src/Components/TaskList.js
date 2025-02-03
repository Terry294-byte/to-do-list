// File: src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks") // Fetch all tasks from the server
      .then((res) => {
        setTasks(res.data); // Store tasks in state
      })
      .catch(() => toast.error("Failed to load tasks.")); // Handle errors
  }, []);

  // Mark task as done or not done
  const toggleStatus = (id, currentStatus) => {
    // Find the task to update
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    // Create updated task object
    const updatedTask = { ...taskToUpdate, status: !currentStatus };

    axios
      .patch(`http://localhost:3001/tasks/${id}`, updatedTask) // Use PATCH instead of POST
      .then(() => {
        toast.success("Task status updated!");

        // Update task status in state
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: !currentStatus } : task
          )
        );
      })
      .catch(() => toast.error("Failed to update status.")); // Handle errors
  };

  // Delete task by ID
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`) // Send delete request
      .then(() => {
        toast.success("Task deleted successfully!");
        setTasks(tasks.filter((task) => task.id !== id)); // Remove deleted task from state
      })
      .catch(() => toast.error("Failed to delete task.")); // Handle errors
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
                {/* Button to toggle task status */}
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => toggleStatus(task.id, task.status)}
                >
                  {task.status ? "Mark as Not Done" : "Mark as Done"}
                </button>
                {/* Button to delete task */}
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
