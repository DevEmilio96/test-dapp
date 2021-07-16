import MetaMaskOnboarding from '@metamask/onboarding';
// eslint-disable-next-line camelcase
import {
  encrypt,
  recoverPersonalSignature,
  recoverTypedSignatureLegacy,
  recoverTypedSignature,
  recoverTypedSignature_v4 as recoverTypedSignatureV4,
} from 'eth-sig-util';
import { ethers } from 'ethers';
import { toChecksumAddress } from 'ethereumjs-util';
import { web3Eth } from 'web3-eth';
import { web3Emilio } from 'web3-eth';
import {
  hstBytecode,
  hstAbi,
  piggybankBytecode,
  piggybankAbi,
} from './constants.json';


import { BscConnector } from '@binance-chain/bsc-connector';


/* EMILIO ------------------------------------*/
const Web3 = require('web3');
//var web3 = new Web3(web3Eth.givenProvider || "ws://localhost:8545");
//var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8545');
//testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
//mainnet
//const web3 = new Web3('https://bsc-dataseed.binance.org/');
export const bsc = new BscConnector({
  supportedChainIds: [/*56, */97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})

// invoke method on bsc e.g.
async function setBsc() {
  await bsc.activate();
  await bsc.getAccount();
  await bsc.getChainId();

  if (BinanceChain.isConnected())
    console.log(window.BinanceChain);
}
try {
  window.BinanceChain = window.ethereum;
  BinanceChain.autoRefreshOnNetworkChange = false;
  setBsc();

} catch (error) {
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

//const account = web3.eth.accounts.privateKeyToAccount("0x0E7f711C75a24A0492b9d8D366eA4Ec833A570ca");
/* EMILIO ------------------------------------*/
let ethersProvider;
let hstFactory;
let piggybankFactory;
let listOfNormalTransaction;
let privateKey = "acf2c24fa5be22f82eb79d5835dc50e662e4895af61205b996e21df7a4fdd49d";
const currentUrl = new URL(window.location.href);
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:8545' : undefined;
/* ricorda di mettere 9011 */

const { isMetaMaskInstalled } = MetaMaskOnboarding;

// Dapp Status Section
const networkDiv = document.getElementById('network');
const chainIdDiv = document.getElementById('chainId');
const web3VersionDiv = document.getElementById('web3Version');
const testBalance = document.getElementById('testBalance');

// Use BigNumber
let decimals = web3.utils.toBN(18);
let amount = web3.utils.toBN(100);

web3.eth.defaultAccount = '0xDd1b9Ed9e1BDAc0ff6E05E91856CbE9DEdDCd034';
/*web3.eth.defaultChain = 'goerli';
web3.eth.defaultHardfork = 'istanbul';
web3.eth.defaultBlock = 231;*/
// compiled solidity source code using https://remix.ethereum.org
var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";
//var balance =web3.eth.getBalance("0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c").then(console.log);
/* 0x998dA8aBB100270d2B68C789679841f562ac880e creato tramite test*/
// The minimum ABI to get ERC20 Token balance
var minABI = [
  // balanceOf
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  // decimals
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "type": "function"
  },
  // transfer
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];
var contract = new web3.eth.Contract(minABI, "0x0FA23aF3Dd09647AC3FFa3CcCe69Ad1129424691");

async function getBalance() {
  var balance = await contract.methods.balanceOf("0x0E7f711C75a24A0492b9d8D366eA4Ec833A570ca").call();
  return balance;
}
/*acf2c24fa5be22f82eb79d5835dc50e662e4895af61205b996e21df7a4fdd49d*/
/* moneta custom solo emilio
getBalance().then(function (balance) {
  //balance = parseFloat(balance) / 10;
  testBalance.innerHTML = "TTK: " + parseFloat(web3.utils.fromWei(balance, 'ether'))
});*/
//web3VersionDiv.innerHTML = '';

/* CONVERTI INPUT DELLA TRANSAZIONE IN TOKEN TRASFERITI */
/*web3.eth.getTransaction("0x2c4d01f3ac2309d52887d2ce0fa2118386dcb1c7fa06f554c3f3f7c2dd9dc6c5").then(result => (
//parseFloat(web3.utils.fromWei(balance, 'gwei'))
  console.log("getTransaction:"  + web3.utils.toDecimal("0x5f5e100")/1000000000)
));*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* testnet API for retrieve all normal transaction 
https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken */
/*var BNBbalance = web3.eth.getBalance("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
console.log("BNB BALANCE: " + BNBbalance);*/

const accountsDiv = document.getElementById('accounts');
const vestigContractPercentDiv = document.getElementById('vestigContractPercent');
//var utilityAccount = web3.eth.accounts.create();

// Basic Actions Section
const presaleProgressLabel = document.getElementById('presaleProgress');
const tokenRiscattatiLabel = document.getElementById('tokenRiscattati');
const tokendaRiscattareLabel = document.getElementById('tokendaRiscattare');
const onboardButton = document.getElementById('connectButton');
const getAccountsButton = document.getElementById('getAccounts');
const getAccountsResults = document.getElementById('getAccountsResult');
const getAccountsInfos = document.getElementById('getAccountsInfo');
const claimVestingBtn = document.getElementById('claimVesting');
const claimVestingLabel = document.getElementById('lastClaimDate');

//getAccountsInfos.innerHTML= ;
var utilityAccount = web3.eth.accounts.privateKeyToAccount(privateKey, true);
/*var keystore = web3.eth.accounts.encrypt(privateKey, password);
const decryptedAccount = web3.eth.accounts.decrypt(keystore, 'PASSWORD');*/
//console.log("UTILITY ACCOUNT " + utilityAccount['address'] );
web3.eth.accounts.wallet.add(privateKey);
/*$.getJSON('https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x0FA23aF3Dd09647AC3FFa3CcCe69Ad1129424691&startblock=1&endblock=99999999&sort=asc&apikey=7HPIDVRIT3QU777VG9QI9UCXC72Y8VSQRJ', function(data) {
  const listOfNormalTransaction = data['result'];
    for(let i = 1;i<listOfNormalTransaction.length;i++){
 /* let mark = str.substring(1, 4) ;
      let transactionInfo = str.substring(1, 4) ;
      let tokenTransfered = str.substring(1, 4) ;*/
/*  let str = listOfNormalTransaction[i]['input'];
  console.log(str.substring(74) + " convert " + parseInt("0x" + str.substring(74), 16));
 // console.log("getTransaction:"  + web3.utils.toDecimal("0x"+ str.substring(74))/1000000000)
 //0000000000000000000000000000000000000000000000056bc75e2d63100000
 //console.log("getTransaction:"  + web3.utils.toDecimal("0x56bc75e2d63100000")/1000000000);
 //console.log(parseInt("0x" + str.substring(74), 16)/1000000000);
/* }
//console.log(listOfNormalTransaction.length);
}); */
let tot = 0;
let totOriginali = 0;
let percentualeDovuta = 0;
let UfoOriginaliRicevuti = 99999999999;

async function testTransaction() {
  try {
    const testAccounts = await ethereum.request({
      method: 'eth_accounts',
    });
    //// utility ricevuti e calcolo percentuale dovuta
    $.getJSON('https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x5932029BA35CCFA49F3BFe5f8B3D87F161e2E783&startblock=1&endblock=99999999&sort=asc&apikey=7HPIDVRIT3QU777VG9QI9UCXC72Y8VSQRJ', function (data) {
      listOfNormalTransaction = data['result'];
      tot = 0;
      for (let i = 0; i < listOfNormalTransaction.length; i++) {

        let str = listOfNormalTransaction[i]['from'];

        if (testAccounts[0] == str && listOfNormalTransaction[i]['isError'] == 0) {
          //console.log(listOfNormalTransaction[i]);
          let convert = listOfNormalTransaction[i]['value'] / 1000000000000000000;
        
          convert = convert * 22500;
          tot = tot + convert;
        }
      }
      percentualeDovuta = (tot * 5) / 100;

    let check30DayTransactionClaim = false;
      //// ufo originali ricevuti
      $.getJSON('https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x0d9B34CB29602971a45Eeb5865ce9D695793ad92&startblock=1&endblock=99999999&sort=asc&apikey=7HPIDVRIT3QU777VG9QI9UCXC72Y8VSQRJ', function (data) {
        UfoOriginaliRicevuti = data['result'];
        for (let i = 1; i < UfoOriginaliRicevuti.length; i++) {

          let str = UfoOriginaliRicevuti[i]['input'];
          let date = new Date(UfoOriginaliRicevuti[i]['timeStamp'] * 1000);
          let date2 = new Date();
          date2.setMonth(date2.getMonth()+100);
          date2.setDate(date2.getDate());
          date2.setFullYear(date2.getFullYear());
     ////// giorni che devono passare tra ogni claim 
          if (datediff(date, date2) < 1) {
            check30DayTransactionClaim = true;
            console.log( "giorni di differenza " + datediff(date, date2));
            console.log(new Date(date) + "inviati all'indirizzo " + str.substring(34, 74));
          }

          if (testAccounts[0] == "0x" + str.substring(34, 74) && UfoOriginaliRicevuti[i]['isError'] == 0) {

            let convert = parseInt("0x" + str.substring(74), 16) / 1000000000000000000;
            console.log(str.substring(74) + " ricevuti convert " + convert);
            totOriginali = totOriginali + convert;
          }
        }

        /* tokenRiscattatiLabel.innerHTML="Riscattati:" + totOriginali;
         tokendaRiscattareLabel.innerHTML="Da riscattare:" + (tot - totOriginali);*/
        console.log("totOriginali = " + totOriginali);

        //console.log(listOfNormalTransaction.length);
        console.log("CONNECTED ACCOUNT " + testAccounts[0]);
        let tokenAddress = "0x0d9B34CB29602971a45Eeb5865ce9D695793ad92";
        let fromAddress = "0xDd1b9Ed9e1BDAc0ff6E05E91856CbE9DEdDCd034";
        // Use BigNumber
        let decimals = web3.utils.toBN(18);
        let amount = web3.utils.toBN(percentualeDovuta * 100000000000000000);
        // Get ERC20 Token contract instance
        let contract = new web3.eth.Contract(minABI, tokenAddress);
        // calculate ERC20 token amount
        let value = amount.mul(web3.utils.toBN(1).pow(decimals));
        value = value * 10 ;
        // call transfer function DA RIATTIVARE
        //0x0d9B34CB29602971a45Eeb5865ce9D695793ad92 UFO TRUFFALDINO ORIGINALE // 0x0FA23aF3Dd09647AC3FFa3CcCe69Ad1129424691 pezzotto
        console.log("totale = " + tot + "totOriginali = " + totOriginali);
        if (tot - totOriginali > 0 && check30DayTransactionClaim == false) {
          contract.methods.transfer(testAccounts[0], "0x" + (percentualeDovuta* 1000000000000000000).toString(16)).send({
            from: fromAddress,
            gas: 1000000,
            contractAddress: "0x0d9B34CB29602971a45Eeb5865ce9D695793ad92",
            to: testAccounts[0]
          })
            .on('transactionHash', function (hash) {
              console.log(hash);

            });
          claimVestingBtn.disabled = true;
          alert("UFO RICEVUTI");
        } else {
          alert("HAI GIA RICEVUTO I TUOI UFO!");
        }
      });




    });



  } catch (error) {
    console.error(error);
  }
}


claimVestingBtn.onclick = async () => {
  await testTransaction();

};
//testTransaction();



// Permissions Actions Section
const requestPermissionsButton = document.getElementById('requestPermissions');
const getPermissionsButton = document.getElementById('getPermissions');
const permissionsResult = document.getElementById('permissionsResult');

// Contract Section
const deployButton = document.getElementById('deployButton');
const depositButton = document.getElementById('depositButton');
const withdrawButton = document.getElementById('withdrawButton');
const contractStatus = document.getElementById('contractStatus');

// Send Eth Section
const sendButton = document.getElementById('sendButton');

// Send Tokens Section
const tokenAddress = document.getElementById('tokenAddress');
const createToken = document.getElementById('createToken');
const watchAsset = document.getElementById('watchAsset');
const transferTokens = document.getElementById('transferTokens');
const approveTokens = document.getElementById('approveTokens');
const transferTokensWithoutGas = document.getElementById(
  'transferTokensWithoutGas',
);
const approveTokensWithoutGas = document.getElementById(
  'approveTokensWithoutGas',
);

// Encrypt / Decrypt Section
const getEncryptionKeyButton = document.getElementById(
  'getEncryptionKeyButton',
);
const encryptMessageInput = document.getElementById('encryptMessageInput');
const encryptButton = document.getElementById('encryptButton');
const decryptButton = document.getElementById('decryptButton');
const encryptionKeyDisplay = document.getElementById('encryptionKeyDisplay');
const ciphertextDisplay = document.getElementById('ciphertextDisplay');
const cleartextDisplay = document.getElementById('cleartextDisplay');

// Ethereum Signature Section
const ethSign = document.getElementById('ethSign');
const ethSignResult = document.getElementById('ethSignResult');
const personalSign = document.getElementById('personalSign');
const personalSignResult = document.getElementById('personalSignResult');
const personalSignVerify = document.getElementById('personalSignVerify');
const personalSignVerifySigUtilResult = document.getElementById(
  'personalSignVerifySigUtilResult',
);
const personalSignVerifyECRecoverResult = document.getElementById(
  'personalSignVerifyECRecoverResult',
);
const signTypedData = document.getElementById('signTypedData');
const signTypedDataResult = document.getElementById('signTypedDataResult');
const signTypedDataVerify = document.getElementById('signTypedDataVerify');
const signTypedDataVerifyResult = document.getElementById(
  'signTypedDataVerifyResult',
);
const signTypedDataV3 = document.getElementById('signTypedDataV3');
const signTypedDataV3Result = document.getElementById('signTypedDataV3Result');
const signTypedDataV3Verify = document.getElementById('signTypedDataV3Verify');
const signTypedDataV3VerifyResult = document.getElementById(
  'signTypedDataV3VerifyResult',
);
const signTypedDataV4 = document.getElementById('signTypedDataV4');
const signTypedDataV4Result = document.getElementById('signTypedDataV4Result');
const signTypedDataV4Verify = document.getElementById('signTypedDataV4Verify');
const signTypedDataV4VerifyResult = document.getElementById(
  'signTypedDataV4VerifyResult',
);

// Miscellaneous
const addEthereumChain = document.getElementById('addEthereumChain');
const switchEthereumChain = document.getElementById('switchEthereumChain');

const initialize = async () => {
  try {
    // We must specify the network as 'any' for ethers to allow network changes
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    hstFactory = new ethers.ContractFactory(
      hstAbi,
      hstBytecode,
      ethersProvider.getSigner(),
    );
    piggybankFactory = new ethers.ContractFactory(
      piggybankAbi,
      piggybankBytecode,
      ethersProvider.getSigner(),
    );
  } catch (error) {
    console.error(error);
  }

  let onboarding;
  try {
    onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }

  let accounts;
  let accountButtonsInitialized = false;

  const accountButtons = [
    deployButton,
    depositButton,
    withdrawButton,
    sendButton,
    createToken,
    watchAsset,
    transferTokens,
    approveTokens,
    transferTokensWithoutGas,
    approveTokensWithoutGas,
    getEncryptionKeyButton,
    encryptMessageInput,
    encryptButton,
    decryptButton,
    ethSign,
    personalSign,
    personalSignVerify,
    signTypedData,
    signTypedDataVerify,
    signTypedDataV3,
    signTypedDataV3Verify,
    signTypedDataV4,
    signTypedDataV4Verify,
  ];

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      handleNewAccounts(newAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  const clearTextDisplays = () => {
    encryptionKeyDisplay.innerText = '';
    encryptMessageInput.value = '';
    ciphertextDisplay.innerText = '';
    cleartextDisplay.innerText = '';
  };

  const updateButtons = () => {
    const accountButtonsDisabled =
      !isMetaMaskInstalled() || !isMetaMaskConnected();
    if (accountButtonsDisabled) {
      for (const button of accountButtons) {
        button.disabled = true;
      }
      clearTextDisplays();
    } else {
      deployButton.disabled = false;
      sendButton.disabled = false;
      createToken.disabled = false;
      personalSign.disabled = false;
      signTypedData.disabled = false;
      getEncryptionKeyButton.disabled = false;
      ethSign.disabled = false;
      personalSign.disabled = false;
      signTypedData.disabled = false;
      signTypedDataV3.disabled = false;
      signTypedDataV4.disabled = false;
    }

    if (isMetaMaskInstalled()) {
      addEthereumChain.disabled = false;
      switchEthereumChain.disabled = false;
    } else {
      onboardButton.innerText = 'Click here to install MetaMask!';
      onboardButton.onclick = onClickInstall;
      onboardButton.disabled = false;
    }

    if (isMetaMaskConnected()) {
      onboardButton.innerText = 'Connected';
      onboardButton.disabled = true;
      if (onboarding) {
        onboarding.stopOnboarding();
      }
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  };

  addEthereumChain.onclick = async () => {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          /* chainId: '97',
           rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
           chainName: 'Binance Smart Chain',
           nativeCurrency: { name: 'Wrapped BNB', decimals: 18, symbol: 'WBNB' },
           blockExplorerUrls: ['https://testnet.bscscan.com'],*/
          chainId: '56',
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          chainName: 'Binance Smart Chain',
          nativeCurrency: { name: 'Wrapped BNB', decimals: 18, symbol: 'WBNB' },
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    });
  };

  switchEthereumChain.onclick = async () => {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x64',
        },
      ],
    });
  };

  const initializeAccountButtons = () => {
    if (accountButtonsInitialized) {
      return;
    }
    accountButtonsInitialized = true;

    /**
     * Contract Interactions
     */

    deployButton.onclick = async () => {
      let contract;
      contractStatus.innerHTML = 'Deploying';

      try {
        contract = await piggybankFactory.deploy();
        await contract.deployTransaction.wait();
      } catch (error) {
        contractStatus.innerHTML = 'Deployment Failed';
        throw error;
      }

      if (contract.address === undefined) {
        return;
      }

      console.log(
        `Contract mined! address: ${contract.address} transactionHash: ${contract.transactionHash}`,
      );
      contractStatus.innerHTML = 'Deployed';
      depositButton.disabled = false;
      withdrawButton.disabled = false;

      depositButton.onclick = async () => {
        contractStatus.innerHTML = 'Deposit initiated';
        const result = await contract.deposit({
          from: accounts[0],
          value: '0x3782dace9d900000',
        });
        console.log(result);
        contractStatus.innerHTML = 'Deposit completed';
      };

      withdrawButton.onclick = async () => {
        const result = await contract.withdraw('0xde0b6b3a7640000', {
          from: accounts[0],
        });
        console.log(result);
        contractStatus.innerHTML = 'Withdrawn';
      };

      console.log(contract);
    };

    /**
     * Sending ETH
     */

    /*sendButton.onclick = async () => {
      const result = await web3.eth.sendTransaction({
        contractAddress:'0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        to: '0xDd1b9Ed9e1BDAc0ff6E05E91856CbE9DEdDCd034',
        value: '0x11100',
        gasLimit: 21000,
        gasPrice: 20000000000,
      });
      console.log(result);
    };*/

    /**
     * ERC20 Token
     */

    createToken.onclick = async () => {
      const _initialAmount = 100;
      const _tokenName = 'TST';
      const _decimalUnits = 0;
      const _tokenSymbol = 'TST';

      try {
        const contract = await hstFactory.deploy(
          _initialAmount,
          _tokenName,
          _decimalUnits,
          _tokenSymbol,
        );
        await contract.deployTransaction.wait();
        if (contract.address === undefined) {
          return undefined;
        }

        console.log(
          `Contract mined! address: ${contract.address} transactionHash: ${contract.transactionHash}`,
        );
        tokenAddress.innerHTML = contract.address;
        watchAsset.disabled = false;
        transferTokens.disabled = false;
        approveTokens.disabled = false;
        transferTokensWithoutGas.disabled = false;
        approveTokensWithoutGas.disabled = false;

        watchAsset.onclick = async () => {
          const result = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: contract.address,
                symbol: _tokenSymbol,
                decimals: _decimalUnits,
                image: 'https://metamask.github.io/test-dapp/metamask-fox.svg',
              },
            },
          });
          console.log('result', result);
        };

        transferTokens.onclick = async () => {
          const result = await contract.transfer(
            '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
            '15000',
            {
              from: accounts[0],
              gasLimit: 60000,
              gasPrice: '20000000000',
            },
          );
          console.log('result', result);
        };

        approveTokens.onclick = async () => {
          const result = await contract.approve(
            '0x9bc5baF874d2DA8D216aE9f137804184EE5AfEF4',
            '70000',
            {
              from: accounts[0],
              gasLimit: 60000,
              gasPrice: '20000000000',
            },
          );
          console.log(result);
        };

        transferTokensWithoutGas.onclick = async () => {
          const result = await contract.transfer(
            '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
            '15000',
            {
              gasPrice: '20000000000',
            },
          );
          console.log('result', result);
        };

        approveTokensWithoutGas.onclick = async () => {
          const result = await contract.approve(
            '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
            '70000',
            {
              gasPrice: '20000000000',
            },
          );
          console.log(result);
        };

        return contract;
      } catch (error) {
        tokenAddress.innerHTML = 'Creation Failed';
        throw error;
      }
    };

    /**
     * Permissions
     */

    requestPermissionsButton.onclick = async () => {
      try {
        const permissionsArray = await ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        permissionsResult.innerHTML =
          getPermissionsDisplayString(permissionsArray);
      } catch (err) {
        console.error(err);
        permissionsResult.innerHTML = `Error: ${err.message}`;
      }
    };

    getPermissionsButton.onclick = async () => {
      try {
        const permissionsArray = await ethereum.request({
          method: 'wallet_getPermissions',
        });
        permissionsResult.innerHTML =
          getPermissionsDisplayString(permissionsArray);
      } catch (err) {
        console.error(err);
        permissionsResult.innerHTML = `Error: ${err.message}`;
      }
    };

  /*  getAccountsButton.onclick = async () => {
      try {
        const _accounts = await ethereum.request({
          method: 'eth_accounts',
        });
        getAccountsResults.innerHTML =
          _accounts[0] || 'Not able to get accounts';
      } catch (err) {
        console.error(err);
        getAccountsResults.innerHTML = `Error: ${err.message}`;
      }
    };*/

    /**
     * Encrypt / Decrypt
     */

    getEncryptionKeyButton.onclick = async () => {
      try {
        encryptionKeyDisplay.innerText = await ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [accounts[0]],
        });
        encryptMessageInput.disabled = false;
      } catch (error) {
        encryptionKeyDisplay.innerText = `Error: ${error.message}`;
        encryptMessageInput.disabled = true;
        encryptButton.disabled = true;
        decryptButton.disabled = true;
      }
    };

    encryptMessageInput.onkeyup = () => {
      if (
        !getEncryptionKeyButton.disabled &&
        encryptMessageInput.value.length > 0
      ) {
        if (encryptButton.disabled) {
          encryptButton.disabled = false;
        }
      } else if (!encryptButton.disabled) {
        encryptButton.disabled = true;
      }
    };

    encryptButton.onclick = () => {
      try {
        ciphertextDisplay.innerText = stringifiableToHex(
          encrypt(
            encryptionKeyDisplay.innerText,
            { data: encryptMessageInput.value },
            'x25519-xsalsa20-poly1305',
          ),
        );
        decryptButton.disabled = false;
      } catch (error) {
        ciphertextDisplay.innerText = `Error: ${error.message}`;
        decryptButton.disabled = true;
      }
    };

    decryptButton.onclick = async () => {
      try {
        cleartextDisplay.innerText = await ethereum.request({
          method: 'eth_decrypt',
          params: [ciphertextDisplay.innerText, ethereum.selectedAddress],
        });
      } catch (error) {
        cleartextDisplay.innerText = `Error: ${error.message}`;
      }
    };
  };

  /**
   * eth_sign
   */
  ethSign.onclick = async () => {
    try {
      // const msg = 'Sample message to hash for signature'
      // const msgHash = keccak256(msg)
      const msg =
        '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0';
      const ethResult = await ethereum.request({
        method: 'eth_sign',
        params: [accounts[0], msg],
      });
      ethSignResult.innerHTML = JSON.stringify(ethResult);
    } catch (err) {
      console.error(err);
      ethSign.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Personal Sign
   */
  personalSign.onclick = async () => {
    const exampleMessage = 'Example `personal_sign` message';
    try {
      const from = accounts[0];
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password'],
      });
      personalSignResult.innerHTML = sign;
      personalSignVerify.disabled = false;
    } catch (err) {
      console.error(err);
      personalSign.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Personal Sign Verify
   */
  personalSignVerify.onclick = async () => {
    const exampleMessage = 'Example `personal_sign` message';
    try {
      const from = accounts[0];
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
      const sign = personalSignResult.innerHTML;
      const recoveredAddr = recoverPersonalSignature({
        data: msg,
        sig: sign,
      });
      if (recoveredAddr === from) {
        console.log(`SigUtil Successfully verified signer as ${recoveredAddr}`);
        personalSignVerifySigUtilResult.innerHTML = recoveredAddr;
      } else {
        console.log(
          `SigUtil Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
        );
        console.log(`Failed comparing ${recoveredAddr} to ${from}`);
      }
      const ecRecoverAddr = await ethereum.request({
        method: 'personal_ecRecover',
        params: [msg, sign],
      });
      if (ecRecoverAddr === from) {
        console.log(`Successfully ecRecovered signer as ${ecRecoverAddr}`);
        personalSignVerifyECRecoverResult.innerHTML = ecRecoverAddr;
      } else {
        console.log(
          `Failed to verify signer when comparing ${ecRecoverAddr} to ${from}`,
        );
      }
    } catch (err) {
      console.error(err);
      personalSignVerifySigUtilResult.innerHTML = `Error: ${err.message}`;
      personalSignVerifyECRecoverResult.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Sign Typed Data Test
   */
  signTypedData.onclick = async () => {
    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!',
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337',
      },
    ];
    try {
      const from = accounts[0];
      const sign = await ethereum.request({
        method: 'eth_signTypedData',
        params: [msgParams, from],
      });
      signTypedDataResult.innerHTML = sign;
      signTypedDataVerify.disabled = false;
    } catch (err) {
      console.error(err);
      signTypedDataResult.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Sign Typed Data Verification
   */
  signTypedDataVerify.onclick = async () => {
    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!',
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1337',
      },
    ];
    try {
      const from = accounts[0];
      const sign = signTypedDataResult.innerHTML;
      const recoveredAddr = await recoverTypedSignatureLegacy({
        data: msgParams,
        sig: sign,
      });
      if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
        console.log(`Successfully verified signer as ${recoveredAddr}`);
        signTypedDataVerifyResult.innerHTML = recoveredAddr;
      } else {
        console.log(
          `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
        );
      }
    } catch (err) {
      console.error(err);
      signTypedDataV3VerifyResult.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Sign Typed Data Version 3 Test
   */
  signTypedDataV3.onclick = async () => {
    const networkId = parseInt(networkDiv.innerHTML, 10);
    const chainId = parseInt(chainIdDiv.innerHTML, 16) || networkId;

    const msgParams = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      message: {
        sender: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        recipient: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    };
    try {
      const from = accounts[0];
      const sign = await ethereum.request({
        method: 'eth_signTypedData_v3',
        params: [from, JSON.stringify(msgParams)],
      });
      signTypedDataV3Result.innerHTML = sign;
      signTypedDataV3Verify.disabled = false;
    } catch (err) {
      console.error(err);
      signTypedDataV3Result.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Sign Typed Data V3 Verification
   */
  signTypedDataV3Verify.onclick = async () => {
    const networkId = parseInt(networkDiv.innerHTML, 10);
    const chainId = parseInt(chainIdDiv.innerHTML, 16) || networkId;

    const msgParams = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      message: {
        sender: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        recipient: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    };
    try {
      const from = accounts[0];
      const sign = signTypedDataV3Result.innerHTML;
      const recoveredAddr = await recoverTypedSignature({
        data: msgParams,
        sig: sign,
      });
      if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
        console.log(`Successfully verified signer as ${recoveredAddr}`);
        signTypedDataV3VerifyResult.innerHTML = recoveredAddr;
      } else {
        console.log(
          `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
        );
      }
    } catch (err) {
      console.error(err);
      signTypedDataV3VerifyResult.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   * Sign Typed Data V4
   */
  signTypedDataV4.onclick = async () => {
    const networkId = parseInt(networkDiv.innerHTML, 10);
    const chainId = parseInt(chainIdDiv.innerHTML, 16) || networkId;
    const msgParams = {
      domain: {
        chainId: chainId.toString(),
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };
    try {
      const from = accounts[0];
      const sign = await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [from, JSON.stringify(msgParams)],
      });
      signTypedDataV4Result.innerHTML = sign;
      signTypedDataV4Verify.disabled = false;
    } catch (err) {
      console.error(err);
      signTypedDataV4Result.innerHTML = `Error: ${err.message}`;
    }
  };

  /**
   *  Sign Typed Data V4 Verification
   */
  signTypedDataV4Verify.onclick = async () => {
    const networkId = parseInt(networkDiv.innerHTML, 10);
    const chainId = parseInt(chainIdDiv.innerHTML, 16) || networkId;
    const msgParams = {
      domain: {
        chainId,
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };
    try {
      const from = accounts[0];
      const sign = signTypedDataV4Result.innerHTML;
      const recoveredAddr = recoverTypedSignatureV4({
        data: msgParams,
        sig: sign,
      });
      if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
        console.log(`Successfully verified signer as ${recoveredAddr}`);
        signTypedDataV4VerifyResult.innerHTML = recoveredAddr;
      } else {
        console.log(
          `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
        );
      }
    } catch (err) {
      console.error(err);
      signTypedDataV4VerifyResult.innerHTML = `Error: ${err.message}`;
    }
  };

  async function handleNewAccounts(newAccounts) {
    accounts = newAccounts;
    accountsDiv.innerHTML = accounts;
    web3.eth.getBalance(accounts[0]).then(result => (
      web3VersionDiv.innerHTML = "WBNB: " + web3.utils.fromWei(result, 'ether')
    ));


let ufoContractAddress = "0x5932029BA35CCFA49F3BFe5f8B3D87F161e2E783";
    if (isMetaMaskConnected()) {
  
    //$.getJSON('https://api1.binance.com/api/v3/trades?symbol=BNBUSDT', function (BNBPRICE) {
      $.getJSON('https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x5932029BA35CCFA49F3BFe5f8B3D87F161e2E783&startblock=1&endblock=99999999&sort=asc&apikey=7HPIDVRIT3QU777VG9QI9UCXC72Y8VSQRJ', function (data) {
        let listOfNormalTransaction = data['result'];
        let tot = 0;
        let totOriginali = 0;
        let percentualeDovuta = 0;
        let check30DayTransaction = false;
        let date2 = new Date();
        let tokenTotaliVenduti = 0;
        let BNBTotaliVenduti = 0;
        for (let i = 0; i < listOfNormalTransaction.length; i++) {

          let str = listOfNormalTransaction[i]['from'];
          let strTotBuyed = listOfNormalTransaction[i]['to'];
     
          if ((ufoContractAddress.toUpperCase()).localeCompare(strTotBuyed.toUpperCase()) == 0  && listOfNormalTransaction[i]['isError'] == 0) {
           
            let convertTotaliVenduti = listOfNormalTransaction[i]['value'] / 1000000000000000000;
            BNBTotaliVenduti = BNBTotaliVenduti + convertTotaliVenduti;
            convertTotaliVenduti = convertTotaliVenduti * 22500;
            tokenTotaliVenduti = tokenTotaliVenduti + convertTotaliVenduti;
           
           
          }

          if (accounts[0] == str && listOfNormalTransaction[i]['isError'] == 0) {
            //console.log(listOfNormalTransaction[i]);
            let convert = listOfNormalTransaction[i]['value'] / 1000000000000000000;
          
            convert = convert * 22500;
            tot = tot + convert;
          }
        }
        percentualeDovuta = (tot * 5) / 100;
        testBalance.innerHTML = "UFO: " + tot;
        vestigContractPercentDiv.innerHTML = "NEXT CLAIM: " + percentualeDovuta;
        presaleProgressLabel.innerHTML = "STATUS : " + tokenTotaliVenduti + "/10.000.000 ( "+BNBTotaliVenduti+"/444 BNB )";
        // x : 400 = tokenTotaliVenduti : 10000000  
        ///400*tokenTotaliVenduti/10000000
        console.log("progress bar " + (tokenTotaliVenduti/10000000)*400);
        moveProgressBar((tokenTotaliVenduti/10000000)*400);
        //console.log("totale = " + tot + " PercentualeDovuta = " + percentualeDovuta);
        $.getJSON('https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x0d9B34CB29602971a45Eeb5865ce9D695793ad92&startblock=1&endblock=99999999&sort=asc&apikey=7HPIDVRIT3QU777VG9QI9UCXC72Y8VSQRJ', function (data) {
          UfoOriginaliRicevuti = data['result'];
          let dataPiurecente = new Date(UfoOriginaliRicevuti[0]['timeStamp'] * 1000);
          dataPiurecente.setMonth(dataPiurecente.getMonth()-10);
          dataPiurecente.setDate(dataPiurecente.getDate());
          dataPiurecente.setFullYear(dataPiurecente.getFullYear());
          for (let i = 1; i < UfoOriginaliRicevuti.length; i++) {

            let str = UfoOriginaliRicevuti[i]['input'];
           
           
       
            if (accounts[0] == "0x" + str.substring(34, 74) && UfoOriginaliRicevuti[i]['isError'] == 0) {
              let date = new Date(UfoOriginaliRicevuti[i]['timeStamp'] * 1000);
              
              date2.setMonth(date2.getMonth());
              date2.setDate(date2.getDate());
              date2.setFullYear(date2.getFullYear());
              
              if (dataPiurecente < date){
                dataPiurecente = date;
              }
         ////// giorni che devono passare tra ogni claim 
              if (datediff(date, date2) < 1) {
                check30DayTransaction = true;
                console.log( "giorni di differenza " + datediff(date, date2));
                console.log(date  + "inviati all'indirizzo " + str.substring(34, 74));
              }
              let convert = parseInt("0x" + str.substring(74), 16) / 1000000000000000000;
              // console.log(str.substring(74) + " ricevuti convert " + convert);
              totOriginali = totOriginali + convert;
            }
          }
          let mesePiuRecente = ( 1 + ((dataPiurecente.getMonth()) % 12) );
          if(Math.abs(datediff(dataPiurecente, date2))< 300)
          claimVestingLabel.innerHTML = "LAST CLAIM: " + dataPiurecente.getDate() + "/" + mesePiuRecente + "/" + dataPiurecente.getFullYear() + " ( "+ datediff(dataPiurecente, date2 ) +" Days Ago ) ";
          else
          claimVestingLabel.innerHTML = "LAST CLAIM: NO CLAIM";
          //// gestisce la visibilità di claim
          if (tot - totOriginali > 0 && check30DayTransaction == false) {
            claimVestingBtn.disabled = false;
          } else {
            claimVestingBtn.disabled = true;
          }
          tokenRiscattatiLabel.innerHTML = "CLAIMED:" + totOriginali;
          tokendaRiscattareLabel.innerHTML = "BLOCKED:" + (tot - totOriginali);
          //console.log("totOriginali = " + totOriginali );
        });
      });
      initializeAccountButtons();
    }
    updateButtons();
  }

  function handleNewChain(chainId) {
    chainIdDiv.innerHTML = chainId;
  }

  function handleNewNetwork(networkId) {
    networkDiv.innerHTML = networkId;
  }

  async function getNetworkAndChainId() {
    try {
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });
      handleNewChain(chainId);

      const networkId = await ethereum.request({
        method: 'net_version',
      });
      //handleNewNetwork(networkId);
    } catch (err) {
      console.error(err);
    }
  }

  updateButtons();

  if (isMetaMaskInstalled()) {
    ethereum.autoRefreshOnNetworkChange = false;
    getNetworkAndChainId();

    ethereum.on('chainChanged', handleNewChain);
    ethereum.on('networkChanged', handleNewNetwork);
    ethereum.on('accountsChanged', handleNewAccounts);

    try {
      const newAccounts = await ethereum.request({
        method: 'eth_accounts',
      });
      handleNewAccounts(newAccounts);
      activeBnbButton(newAccounts);
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  }
};

window.addEventListener('DOMContentLoaded', initialize);

// utils

function getPermissionsDisplayString(permissionsArray) {
  if (permissionsArray.length === 0) {
    return 'No permissions found.';
  }
  const permissionNames = permissionsArray.map((perm) => perm.parentCapability);
  return permissionNames
    .reduce((acc, name) => `${acc}${name}, `, '')
    .replace(/, $/u, '');
}

function stringifiableToHex(value) {
  return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
}

function activeBnbButton(ConnectedAddress) {
  //Sending Ethereum to an address
  let number = 0;
  sendButton.addEventListener('click', () => {

    number = document.getElementById('bnbAmount').value * 1000000000000000000;
    let hexBNBAmount = number.toString(16);
    BinanceChain
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: ConnectedAddress[0],
            to: '0x5932029BA35CCFA49F3BFe5f8B3D87F161e2E783',
            gas: '0x5DC0', // 24000
            gasPrice: '0x2540BE400', // 10
            value: hexBNBAmount, // 2441406250
            data:
              '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
          },
        ],
      })

  });
}
// new Date("dateString") is browser-dependent and discouraged, so we'll write
// a simple parse function for U.S. date format (which does no error checking)
function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

// SIGNATURE PROGRESS
function moveProgressBar(progressTotal) {
  console.log("moveProgressBar");
    var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = progressTotal;
    var animationLength = 2000;
    
    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    $('.progress-bar').stop().animate({
        left: progressTotal
    }, animationLength);
}
