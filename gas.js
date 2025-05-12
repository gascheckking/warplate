const API_URL = "https://api.owlracle.info/v4/base/gas?apikey=demo";

async function updateGas() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);
    document.getElementById('gas-price').textContent = `${gwei} Gwei`;
    document.getElementById('gas-fill').style.width = `${Math.min(gwei,100)}%`;
    document.getElementById('gas-mood').textContent = gwei < 30 ? '😎' : gwei < 70 ? '🔥' : '💀';
  } catch (error) {
    console.error("Gas Error:", error);
  }
}
setInterval(updateGas, 30000);
updateGas();