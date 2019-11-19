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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('')

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
          <Nav.Item>
            <Nav.Link disabled>Account: {account}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled style={{ float: 'right' }}>Balance: {balance}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Container>
        <Row>
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
        </Row>
      </Container>
      <TorusWallet provideWeb3={setWeb3} provideAccount={setAccount} provideBalance={setBalance} />
      <Navbar fixed="bottom" style={{ marginTop: "20px" }}>
        <a href="https://github.com/borxes/torus-htlc">
          <Navbar.Brand>Source code on Github</Navbar.Brand>
        </a>
        <Nav variant="pills" className="justify-content-end">
          <Nav.Item>
            By Yura Sherman (c)2019
          </Nav.Item>
        </Nav>
      </Navbar>

    </Router >

  );
}

export default App;
