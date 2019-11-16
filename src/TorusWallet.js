/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';
import { HTLC_ABI } from './web3/htlc-abi';

const HTLC_ROPSTEN = '0x243785f6B65418191ea20B45FdE7069ffe4F8ceF';

export default function TorusWallet({ provideWeb3 }) {

  const [isTorus, setIsTorus] = useState(sessionStorage.getItem('pageUsingTorus'));
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [htlc, setHtlc] = useState();

  useEffect(() => {

    const initTorus = async () => {
      if (isTorus) {
        const torus = new Torus();
        await torus.init({
          network: {
            host: process.env.REACT_APP_TORUS_NETWORK_HOST || 'ropsten',
          }
        });
        await torus.login();
        const web3Instance = new Web3(torus.provider);
        const accounts = await web3Instance.eth.getAccounts();
        const balance = await web3Instance.eth.getBalance(accounts[0]);

        const htlcContract = new web3Instance.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);

        setWeb3(web3Instance);
        provideWeb3(web3Instance);
        setAccount(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balance.toString(), 'ether'));
        setHtlc(htlcContract);
        sessionStorage.setItem('pageUsingTorus', true);
      }
    };
    initTorus();
  }, [isTorus]);


  // function newContract(address payable _receiver, bytes32 _hashlock, uint _timelock)
  const send = async () => {
    const hashlock = web3.utils.fromAscii("20160528");
    const receiver = '0x3587613C07A95A7f471449f90E757647A3f1E86A';
    const timelock = Date.now() + 100000;
    const encoded = htlc.methods.newContract(receiver, hashlock, timelock)
      .encodeABI();
    const tx = {
      from: account,
      to: HTLC_ROPSTEN,
      data: encoded,
      gasLimit: 200000,
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      value: web3.utils.toWei('0.1', 'ether'),
    };
    await web3.eth.sendTransaction(tx);
  };

  return (
    <div className="Torus">
      <div>
        <button onClick={() => { setIsTorus(true); }}>Start using Torus</button>
      </div>
      <div>
        <div>Account: {account}</div>
        <div>Balance: {balance}</div>
      </div>
      <div>
        <button onClick={() => {
          send();
        }}>Send moneys</button>
      </div>
    </div>
  )
}

TorusWallet.propTypes = {
  provideWeb3: PropTypes.func.isRequired,
};