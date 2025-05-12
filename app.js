// Initiera Ethereum Provider
let provider;
let signer;

// DOM Element
const connectWalletBtn = document.getElementById('connectWallet');
const xpDisplay = document.getElementById('xpDisplay');
const gasProgress = document.querySelector('.gas-progress');
const gasValue = document.getElementById('gasValue');

// Flikhantering
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab, .tab-content').forEach(el => {
      el.classList.remove('active');
    });
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Wallet Connection
async function connectWallet() {
  if (!window.ethereum) {
    alert('Installera MetaMask!');
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    
    // Uppdatera UI
    const address = await signer.getAddress();
    connectWalletBtn.textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
    
    // Ladda initial data
    loadOnchainData();
    startGasUpdates();

  } catch (error) {
    console.error('Wallet Error:', error);
    alert('Något gick fel: ' + error.message);
  }
}

// Ladda onchain-data
async function loadOnchainData() {
  // Hämta XP från kontrakt (mockad)
  xpDisplay.textContent = '1420 XP 🔥';
}

// Realtids gaspris
async function startGasUpdates() {
  async function updateGas() {
    try {
      const response = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
      const data = await response.json();
      const avgGas = data.speeds[1].estimatedFee;
      
      gasProgress.style.setProperty('--gas-width', `${Math.min(avgGas, 100)}%`);
      gasValue.textContent = `${avgGas.toFixed(1)} Gwei`;

    } catch (error) {
      console.error('Gas Error:', error);
      gasValue.textContent = 'Error';
    }
  }

  // Uppdatera direkt och var 30:e sekund
  updateGas();
  setInterval(updateGas, 30000);
}

// Event Listeners
connectWalletBtn.addEventListener('click', connectWallet);

// Köp Premium
document.getElementById('buyPremium').addEventListener('click', async () => {
  if (!signer) {
    alert('Koppla plånbok först!');
    return;
  }

  try {
    const tx = await signer.sendTransaction({
      to: "0xPremiumContractAddress",
      value: ethers.utils.parseEther("0.009")
    });
    
    alert(`Premium köpt! TX: ${tx.hash}`);
    
  } catch (error) {
    console.error('Premium Error:', error);
    alert('Köp misslyckades: ' + error.message);
  }
});
