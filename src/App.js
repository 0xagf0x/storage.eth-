import React, { useEffect, useState, useCallback } from "react";
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/loadContract';  // import this function 

function App() {

  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
    contract: null,
  }) 

  const [balance, setBalance] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  // console.log(web3API.web3);


  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload])

  useEffect(() => {
    const loadBalance = async () => {
     
      const { contract, web3 } = web3API;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, 'ether'));
      // console.log(balance, 'balance')
    } 
    web3API.contract && loadBalance()
  }, [web3API, shouldReload])

  useEffect(() => {
    const loadProvider = async () => {
      // with metamask, we have access to window.ethereum & window.web3
      // metamask injects a global API into the website 
      // this API allows websites to request users, accounts, read data to blockchain
      // sign messages and transactions

      //* console.log(window.web3);
      //* console.log(window.ethereum);
      
      // connect to provider
      const provider = await detectEthereumProvider();
      const contract  = await loadContract('Faucet', provider);
      if (provider) {
        const chainID = await provider.request({ // legacy providers may only have ethereum.sendAsync
          method: 'eth_chainId'
        })
      } else {
        console.log('no provider found')
      }

      console.log(contract)

      // create new instance of web3
      setWeb3API({
        web3: new Web3(provider),
        provider,
        contract,
      })
    }

    loadProvider();
  }, [])
  
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3API.web3.eth.getAccounts();  // gets array of accounts 
      setAccount(accounts[0])
    }

    if (web3API.web3) {
      getAccounts()  // getAccounts() will only be initialized when you have web3API object
    }
  }, [web3API.web3])

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3API;
    await contract.addFunds({  // this func is being called from FaucetContract.sol
      from: accounts,
      value: web3.utils.toWei('1', 'ether')  // must be 1 ETH
    });

    // reload window
    reloadEffect();
  }, [web3API, accounts, reloadEffect])


  const withdrawFunds = async () => {
    const { contract, web3 } = web3API; 
    const withdrawAmount = web3.utils.toWei('0.10', 'ether')
    await contract.withdraw(withdrawAmount, {  // this func is being called from FaucetContract.sol
      from: accounts,
    });

    reloadEffect();
  }

  

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="is-flex is-align-items-center">
          <span className="mr-2">Account: </span>
          <h1> {accounts ?  accounts 
          : 
          <button className="button is-small" onClick={ async () => {
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
          }}>
            Connect Metamask
          </button>
          }</h1>
        </div>
        <div className="balance-view is-size-2 mb-4">
          Current Balance: <strong>{balance}</strong>ETH
        </div>
        <button className="button is-primary mr-2" onClick={addFunds}>Donate 1 ETH</button>
        <button className="button is-link" onClick={withdrawFunds}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
