import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import TorusWallet from './TorusWallet';
import Home from './Home';
import Send from './Send';
import Receive from './Receive';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [web3, setWeb3] = useState();

  return (

    <Router>
      <Navbar bg="light" variant="light">
        <LinkContainer to="/home">
          <Navbar.Brand>Torus + HTLC</Navbar.Brand>
        </LinkContainer>
        <Nav variant="pills" className="justify-content-end">
          <Nav.Item>
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/send">
              <Nav.Link eventKey="send">Send</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/receive">
              <Nav.Link eventKey="receive">Receive</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            <Switch>
              <Route exact path={['/', '/home']}>
                <Home />
              </Route>
              <Route path="/send">
                <Send web3={web3} />
              </Route>
              <Route path="/receive">
                <Receive web3={web3} />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <TorusWallet provideWeb3={setWeb3} />
    </Router >

  );
}

export default App;
