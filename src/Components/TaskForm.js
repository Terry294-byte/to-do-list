import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !date) {
      toast.error("Task name and date are required!");
      return;
    }

    const newTask = { taskName, date, status };

    
      axios.post("http://localhost:3001/tasks", newTask)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Task added successfully!");
          setTaskName("");
          setDate("");
          setStatus(false);
          history.push("/tasks");
        }
      })
      .catch(() => toast.error("Failed to add task."));
  };

  return (
    <div className="card">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value={false}>Not Done</option>
            <option value={true}>Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
