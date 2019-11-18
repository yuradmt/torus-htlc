import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import abi from 'ethereumjs-abi';

import { newContract, subscribe } from './web3/htlc';

export default function Send({ web3 }) {

  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [secret, setSecret] = useState('');
  const [sender, setSender] = useState('');
  const [contractId, setContractId] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      accounts && setSender(accounts[0]);
    };
    fetchAccount();
  }, [web3]);

  const sendFunds = async web3 => {
    console.log(`Sender is ${sender}`);
    console.log(`Receiver is ${receiver}`);
    console.log(`Secret phrase is ${secret}.`);
    const b32Secret = web3.utils.asciiToHex(secret);
    const abijsB32Secret = abi.soliditySHA3(['bytes32'], [b32Secret]).toString('hex');
    console.log(`bytes32 secret: ${b32Secret}`);
    console.log(`abi-js packed b32secret: ${abijsB32Secret}`);

    const value = web3.utils.toWei(amount.toString(), 'ether');
    const hashlock = '0x' + abijsB32Secret;
    const timelock = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    // //const contractId = web3.utils.soliditySha3(sender, receiver, value, hashlock, timelock);
    // //const BN = web3.utils.BN;
    // const contractId = web3.utils.soliditySha3(abi.soliditySHA3(
    //   ['address', 'address', 'uint', 'bytes32', 'uint'],
    //   [sender, receiver, value, hashlock, timelock]
    // ));

    // // contractId = sha256(
    // //   abi.encodePacked(
    // //       msg.sender,
    // //       _receiver,
    // //       msg.value,
    // //       _hashlock,
    // //       _timelock
    // //   )
    // //);

    // console.log(`Contract id is ${contractId.toString('hex')}`);

    subscribe(setContractId);
    const txnHash = await newContract(web3, sender, receiver, hashlock, timelock, amount);
    console.log(`txnHash: ${txnHash}`);
  }


  return (
    <>
      <Form>
        <Form.Group controlId="sendEth">
          <Form.Label>Receiver's address</Form.Label>
          <Form.Control
            type="text"
            placeholder="ETH address"
            value={receiver}
            onChange={event => { setReceiver(event.target.value); }}
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

        <Button variant="primary" type="submit" onClick={e => { e.preventDefault(); sendFunds(web3); }}>
          Send Funds
        </Button>
      </Form>
      <div>Contract ID: {contractId}</div>
    </>
  );
}

Send.propTypes = {
  web3: PropTypes.object,
};