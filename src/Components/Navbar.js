import React from "react";  
import { Link } from "react-router-dom";  

// Functional component for the navigation bar  
const Navbar = () => (  
  <nav className="navbar">  {/* Main navigation container */}
    
    {/* Brand link that redirects to the home page */}
    <Link className="navbar-brand" to="/">  
      Task Manager  
    </Link>  
    
    {/* Unordered list for navigation links */}
    <ul className="navbar-nav">  
      
      {/* Navigation item for adding a new task */}
      <li className="nav-item">  
        <Link className="nav-link" to="/">Add Task</Link>  
      </li>  
      
      {/* Navigation item for viewing the list of tasks */}
      <li className="nav-item">  
        <Link className="nav-link" to="/tasks">Task List</Link>  
      </li>  
      
      {/* Navigation item for viewing tasks based on date */}
      <li className="nav-item">  
        <Link className="nav-link" to="/details">Tasks by Date</Link>  
      </li>  
      
    </ul>  
  </nav>  
);  

export default Navbar; // Exporting the component for use in other parts of the application
