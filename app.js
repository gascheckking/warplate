
let provider, signer;

const connectWalletBtn = document.getElementById('connectWallet');
const xpDisplay = document.getElementById('xpDisplay');
const gasProgress = document.getElementById('gasProgress');
const gasValue = document.getElementById('gasValue');

connectWalletBtn.addEventListener('click', connectWallet);

async function connectWallet() {
  if (!window.ethereum) return alert('Installera MetaMask!');
  try {
    connectWalletBtn.disabled = true;
    connectWalletBtn.textContent = 'Ansluter...';

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    connectWalletBtn.textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
    localStorage.setItem('connectedWallet', address);

    await loadOnchainData();
    startGasUpdates();
  } catch (err) {
    alert('Något gick fel: ' + err.message);
  } finally {
    connectWalletBtn.disabled = false;
  }
}

async function loadOnchainData() {
  try {
    const contract = new ethers.Contract("0xYOUR_CONTRACT_ADDRESS", ["function xp(address) view returns (uint256)"], provider);
    const xp = await contract.xp(await signer.getAddress());
    xpDisplay.textContent = `${xp} XP 🔥`;
  } catch (err) {
    console.error('XP Error:', err);
  }
}

function startGasUpdates() {
  async function updateGas() {
    try {
      const res = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
      const data = await res.json();
      const avgGas = data.speeds[1].estimatedFee;
      gasProgress.style.width = `${Math.min(avgGas, 100)}%`;
      gasValue.textContent = `${avgGas.toFixed(1)} Gwei`;
    } catch {
      gasValue.textContent = 'Kunde inte hämta';
    }
  }
  updateGas();
  setInterval(updateGas, 30000);
}

document.getElementById('buyPremium').addEventListener('click', async () => {
  if (!signer) return alert('Koppla plånbok först!');
  try {
    const tx = await signer.sendTransaction({
      to: "0xPremiumContractAddress",
      value: ethers.utils.parseEther("0.009")
    });
    alert(`Premium köpt! TX: ${tx.hash}`);
    await loadOnchainData();
  } catch (err) {
    alert('Köp misslyckades: ' + err.message);
  }
});

window.addEventListener('load', async () => {
  if(localStorage.getItem('connectedWallet')) await connectWallet();
});
