import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sha256 from 'crypto-js/sha256';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Send({ web3 }) {

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [secret, setSecret] = useState('');

  const sendFunds = async () => {
    console.log(`Address is ${address}`);
    const isValid = web3.utils.isAddress(address);
    console.log(`Address is valid: ${isValid}`);
    console.log(`Amount is ${amount}`);
    console.log(`Secret phrase is ${secret}. Hash is ${sha256(secret)}`);
  }


  return (
    <Form>
      <Form.Group controlId="sendEth">
        <Form.Label>Receiver's address</Form.Label>
        <Form.Control
          type="text"
          placeholder="ETH address"
          value={address}
          onChange={event => { setAddress(event.target.value); }}
        />
        <Form.Text className="text-muted">
          Please make sure that the address is correct
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="Amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={event => { setAmount(event.target.value); }}
        />
      </Form.Group>

      <Form.Group controlId="Secret Phrase">
        <Form.Label>Secret Phrase</Form.Label>
        <Form.Control
          type="text"
          value={secret}
          placeholder="Secret phrase"
          onChange={event => { setSecret(event.target.value); }}
        />
        <Form.Text className="text-muted">
          This secret phrase protects the transaction. The receiver must supply it in order to receive the funds.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={e => { e.preventDefault(); sendFunds(); }}>
        Send Funds
      </Button>
    </Form>
  );
}

Send.propTypes = {
  web3: PropTypes.object,
};