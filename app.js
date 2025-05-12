import Web3 from 'web3';
import { getGas } from './gas.js';
import { updateLanguage } from './lang.js';

const WarpXPABI = [/* Din ABI här */];
const CONTRACT_ADDRESS = "0xYOUR_WARPXP_ADDRESS_HERE";

let web3, contract, userAddress;

// Förbättrad wallet-koppling
document.getElementById('connect-wallet').addEventListener('click', async () => {
  try {
    if (!window.ethereum) throw new Error('Install MetaMask');
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    web3 = new Web3(window.ethereum);
    userAddress = accounts[0];
    
    // Network check
    const chainId = await web3.eth.getChainId();
    if (chainId !== 8453) {
      alert('Switch to Base Network');
      return;
    }

    // Initiera kontrakt
    contract = new web3.eth.Contract(WarpXPABI, CONTRACT_ADDRESS);
    
    // Uppdatera UI
    document.getElementById('wallet-address').textContent = 
      `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
    document.getElementById('wallet-section').classList.remove('hidden');
    
    await fetchXP();
    
  } catch (error) {
    console.error('Wallet Error:', error);
    alert(`Error: ${error.message}`);
  }
});

// Förbättrad XP-hämtning
async function fetchXP() {
  try {
    const xp = await contract.methods.xp(userAddress).call();
    document.getElementById('xp-counter').textContent = xp;
  } catch (error) {
    console.error('XP Error:', error);
    document.getElementById('xp-counter').textContent = 'Error';
  }
}

// Initiera
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item, .tab-content').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
    document.getElementById(item.dataset.tab).classList.add('active');
  });
});

// Starta
getGas();
setInterval(getGas, 30000);
updateLanguage('en'); // Default språk
