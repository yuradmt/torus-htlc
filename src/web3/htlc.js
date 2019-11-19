import Web3 from 'web3';
import { HTLC_ABI } from './htlc-abi';

const HTLC_ROPSTEN = '0x243785f6B65418191ea20B45FdE7069ffe4F8ceF';

//const HTLC_ROPSTEN = '0x6beaf9f3fc9cfac80f900109859bf219eb5d2ab6'; // deployed network

export const newContract = async (web3, sender, receiver, hashlock, timelock, amount) => {

  const htlcContract = new web3.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);
  const encoded = htlcContract.methods.newContract(receiver, hashlock, timelock)
    .encodeABI();
  const tx = {
    from: sender,
    to: HTLC_ROPSTEN,
    data: encoded,
    gasLimit: 200000,
    gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
    value: web3.utils.toWei(amount.toString(), 'ether'),
  };
  const txnHash = await web3.eth.sendTransaction(tx);
  return txnHash;
}

export const withdraw = async (web3, sender, contractId, preimage) => {
  const htlcContract = new web3.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);
  const encoded = htlcContract.methods.withdraw(contractId, preimage)
    .encodeABI();
  const tx = {
    from: sender,
    to: HTLC_ROPSTEN,
    data: encoded,
    gasLimit: 200000,
    gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
  };
  console.log(tx);
  const txnHash = await web3.eth.sendTransaction(tx);
  return txnHash;
}

export const subscribe = async (callback) => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/59d4ada40c8e498c87238ff2f1e765ee')
  );
  const instance = new web3.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);
  instance.once('LogHTLCNew', {
    fromBlock: 'latest'
  }, (error, event) => { console.log(`subscribe got event ${event.raw}`); callback(event.raw.topics[1]) });
}

const contractIdIsActive = async id => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/59d4ada40c8e498c87238ff2f1e765ee')
  );
  const instance = new web3.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);
  const contractIdInfo = await instance.methods.getContract(id);
  return !(contractIdInfo.withdrawn || contractIdInfo.refunded);
}

// returns the ID of the first active contract (not withdrawn or refunded) issued to a given receiver
export const findContractId = async (receiver, setContractId) => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/59d4ada40c8e498c87238ff2f1e765ee')
  );
  const instance = new web3.eth.Contract(HTLC_ABI, HTLC_ROPSTEN);
  const depositEvents = await instance.getPastEvents('LogHTLCNew', {
    filter: { receiver }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
  });

  console.log(`Got ${depositEvents.length} depositEvents`)

  for (let i = depositEvents.length - 1; i >= 0; i++) {
    const id = depositEvents[i].returnValues.contractId;
    const status = await contractIdIsActive(id);
    console.log(`Queried contract id ${id}. Status: ${status}`);
    if (status) {
      setContractId(id);
      return;
    }
  }
};