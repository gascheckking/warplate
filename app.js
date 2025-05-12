// Wallet Connection
document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (!window.ethereum) return alert("Install Rabby/MetaMask");
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById('wallet-address').textContent = accounts[0].slice(0,6)+'...';
});

// Claim Function
document.getElementById('claim-btn').addEventListener('click', async () => {
  const contractAddress = "0x8ab57bdfc4e900b62f309bfaa6e1802755330ca6";
  const tx = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      to: contractAddress,
      data: '0x9e281a98'
    }]
  });
  console.log("TX Hash:", tx);
});