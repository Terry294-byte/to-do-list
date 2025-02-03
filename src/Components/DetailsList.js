import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailsList = () => {
  // State to store tasks retrieved from the database
  const [tasks, setTasks] = useState([]);
  // State to store the selected date for filtering
  const [filterDate, setFilterDate] = useState("");

  // useEffect hook to fetch tasks from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks") // Fetch tasks from API
      .then((res) => setTasks(res.data)) // Store retrieved tasks in state
      .catch(() => console.error("Error fetching tasks.")); // Handle fetch error
  }, []);

  return (
    <div className="card">
      <h2>Tasks by Date</h2>

      {/* Date Filter Input */}
      <div className="form-group mt-3">
        <label>Select Date</label>
        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)} // Update filter state on change
        />
      </div>

      {/* Tasks Table */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Filter and display tasks based on selected date */}
          {tasks.map((task) => (
            task.date === filterDate && ( // Show task only if date matches filterDate
              <tr key={task.id}>
                <td>{task.date}</td>
                <td>{task.taskName}</td>
                <td>{task.status ? "Done" : "Not Done"}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsList;
