import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TorusWallet from './TorusWallet';
import Send from './Send';
import Receive from './Receive';

function App() {
  return (

    <Router>
      <Link to="/">Home</Link>

      <Link to="/send">Send</Link>

      <Link to="/receive">Receive</Link>

      <Switch>
        <Route path="/send">
          <Send />
        </Route>
        <Route path="/receive">
          <Receive />
        </Route>
      </Switch>
      <TorusWallet />
    </Router>

  );
}

export default App;
