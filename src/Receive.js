import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withdraw } from './web3/htlc';

export default function Receive({ web3 }) {

  const [contractId, setContractId] = useState('');
  const [secret, setSecret] = useState('');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        accounts && setReceiver(accounts[0]);
      }
    };
    fetchAccount();
  }, [web3]);


  const receiveFunds = async web3 => {
    console.log(`Address is ${receiver}`);
    console.log(`Secret phrase is ${secret}.`);
    const preimage = web3.utils.asciiToHex(secret)
    console.log(`Preimage is ${preimage}`);
    console.log(`Contract id is ${contractId}`);
    const txnHash = withdraw(web3, receiver, contractId, preimage);
    console.log(`txnHash: ${txnHash}`);
  }


  return (
      <Form>
        <Form.Group controlId="ReceiveEth">
          <Form.Label>Contract Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contract ID"
            value={contractId}
            onChange={event => { setContractId(event.target.value); }}
          />
          <Form.Text className="text-muted">
            Contract ID is provided by the sender
          </Form.Text>
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

        <Button
          variant="primary"
          type="submit"
          onClick={e => { e.preventDefault(); receiveFunds(web3); }}
          disabled={web3 === undefined}
        >
          {web3 ? 'Receive Funds' : "Please login to Torus"}
        </Button>
      </Form>
  );
}

Receive.propTypes = {
  web3: PropTypes.object,
};