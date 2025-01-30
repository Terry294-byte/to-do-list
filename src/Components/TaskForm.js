import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const TaskForm = () => {
  // State variables to store task details
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const history = useHistory(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validation: Ensure task name and date are provided
    if (!taskName || !date) {
      toast.error("Task name and date are required!"); // Show error message if fields are empty
      return;
    }

    // Create an object with task details
    const newTask = { taskName, date, status };

    // Send POST request to backend to add a new task
    axios.post("http://localhost:3001/tasks", newTask)
      .then((res) => {
        if (res.status === 201) { // Check if the task was successfully created
          toast.success("Task added successfully!"); // Show success message
          
          // Reset form fields after successful submission
          setTaskName("");
          setDate("");
          setStatus(false);

          history.push("/tasks"); // Redirect user to the tasks page
        }
      })
      .catch(() => toast.error("Failed to add task.")); // Show error message if request fails
  };

  return (
    <div className="card">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Task Name Input Field */}
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} // Update state on change
          />
        </div>

        {/* Date Input Field */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Update state on change
          />
        </div>

        {/* Status Dropdown */}
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")} // Convert string to boolean
          >
            <option value={false}>Not Done</option>
            <option value={true}>Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
