import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
 // Import the Navbar


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailsList from "./Components/DetailsList";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Navbar from "./Components/Navbar";




function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container mt-4">
        <Switch>
          <Route exact path="/" >
        <TaskForm/>
          </Route>
          <Route path="/tasks">
          <TaskList/>
          </Route>
          <Route path="/details">
          <DetailsList/>
          </Route>
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
