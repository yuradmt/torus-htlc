/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';
import { HTLC_ABI } from './web3/htlc-abi';

export default function TorusWallet({ provideWeb3 }) {

  const [isTorus, setIsTorus] = useState(sessionStorage.getItem('pageUsingTorus'));
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

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

        setWeb3(web3Instance);
        provideWeb3(web3Instance);
        setAccount(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balance.toString(), 'ether'));
        sessionStorage.setItem('pageUsingTorus', true);
      }
    };
    initTorus();
  }, [isTorus]);

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
      </div>
    </div>
  )
}

TorusWallet.propTypes = {
  provideWeb3: PropTypes.func.isRequired,
};