import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <Jumbotron>
      <h1>Welcome to Torus HTLC integration!</h1>
      <p>
        Torus is an innovative key management solution for the decentralized web.

        HTLC is a hashlock timed contract that allows time-bound and secret phrase-protected transactions.

        This is a small demo for sending and receiving ETH using Torus and an HTLC.
      </p>
      <p>
        <Button variant="primary" href="https://tor.us" target="_blank">Learn more about Torus</Button>
      </p>
      <p>
        Usage: On the "Send" page, you can send funds protected by a password or a secret phrase.
      </p>
      <p>
        The receiver must specify the secret to withdraw funds on the "Receive" page. The Contract ID is obtained by clicking on the "Find Contract Id" button, or entered manually (assuming the sender has provided it with the secret). "Find Contract Id" will find the most recent "live" contract ID committed to this receiver.
      </p>
    </Jumbotron>
  )
}
