import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailsList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => console.error("Error fetching tasks."));
  }, []);

  return (
    <div className="card">
      <h2>Tasks by Date</h2>
      <div className="form-group mt-3">
        <label>Select Date</label>
        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            task.date === filterDate && ( // Display only matching date tasks
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
