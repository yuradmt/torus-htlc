/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';

export default function TorusWallet({ provideWeb3, provideAccount, provideBalance }) {

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {

    const initTorus = async () => {
      const torus = new Torus({ buttonPosition: 'bottom-right' });
      await torus.init({
        network: {
          host: process.env.REACT_APP_TORUS_NETWORK_HOST || 'ropsten',
        }
      });
      await torus.login();
      const web3Instance = new Web3(torus.provider);
      const accounts = await web3Instance.eth.getAccounts();
      const tempBalance = await web3Instance.eth.getBalance(accounts[0]);
      const ethBalance = web3Instance.utils.fromWei(tempBalance.toString(), 'ether');

      setWeb3(web3Instance);
      provideWeb3(web3Instance);
      setAccount(accounts[0]);
      setBalance(ethBalance);
      sessionStorage.setItem('pageUsingTorus', true);
      provideAccount(accounts[0]);
      provideBalance(ethBalance);
    };

    initTorus();
  }, []);

  return null;
}

TorusWallet.propTypes = {
  provideWeb3: PropTypes.func.isRequired,
  provideAccount: PropTypes.func,
  provideBalance: PropTypes.func,
};