import React from "react";
import { Link } from "react-router-dom";
 // Ensure styling is applied to the navbar

const Navbar = () => (
  <nav className="navbar">
    <Link className="navbar-brand" to="/">
      Task Manager
    </Link>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/">Add Task</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tasks">Task List</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/details">Tasks by Date</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
