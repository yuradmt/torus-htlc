import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Send from './Send';
import Receive from './Receive';

function App() {
  return (

    <Router>
      <Link to="/">Home</Link>

      <Link to="/about">About</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Switch>
        <Route path="/about">
          <Send />
        </Route>
        <Route path="/dashboard">
          <Receive />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
