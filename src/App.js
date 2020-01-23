import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./views/home/home";
import Dashboard from "./views/dashboard/dashboard";
import Measure from "./views/measure/measure";
import Mitigation from "./views/mitigation/mitigation";
import Track from "./views/track/track";
import Login from "./views/login/login";
import Explore from "./views/explore/explore";
import LineChart from "./components/linechart";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/measure" component={Measure} />
        <Route path="/mitigation" component={Mitigation} />
        <Route path="/track" component={Track} />
        <Route path="/explore" component={Explore} />
      </div>
    </Router>
  );
}

export default App;
