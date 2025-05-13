// gas.js
async function updateGas() {
  try {
    const response = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
    const data = await response.json();
    const fastGas = data.speeds[1].estimatedFee.toFixed(1);
    
    document.getElementById('gas-price').textContent = `Fast: ${fastGas} Gwei`;
    document.getElementById('gas-time').textContent = new Date().toLocaleTimeString();
    
    const gasPercentage = Math.min(fastGas, 100);
    document.getElementById('gas-fill').style.width = `${gasPercentage}%`;
    
    let mood = '😎';
    if (fastGas > 30) mood = '🔥';
    if (fastGas > 70) mood = '💀';
    document.getElementById('gas-mood').textContent = mood;
  } catch (error) {
    console.error('Gas update error:', error);
  }
}

updateGas();
setInterval(updateGas, 30000);