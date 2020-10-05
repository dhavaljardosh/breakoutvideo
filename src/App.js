import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Breakout from "./games/breakout";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/breakout">
          <Breakout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
