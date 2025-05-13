const API_URL = "https://api.owlracle.info/v4/base/gas?apikey=demo";

async function updateGas() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Bad response from API");
    const data = await response.json();

    const fast = data.speeds[1]?.estimatedFee || 0;
    const gwei = parseFloat(fast).toFixed(1);
    const percent = Math.min(gwei, 100);

    document.getElementById("gas-price").textContent = `Fast: ${gwei} Gwei`;
    document.getElementById("gas-fill").style.width = `${percent}%`;
    document.getElementById("gas-time").textContent = new Date().toLocaleTimeString();

    let mood = "😎";
    if (gwei > 30) mood = "🔥";
    if (gwei > 70) mood = "💀";
    document.getElementById("gas-mood").textContent = mood;

  } catch (err) {
    console.error("Gas update failed:", err);
    document.getElementById("gas-price").textContent = "Error loading gas";
    document.getElementById("gas-mood").textContent = "❌";
    document.getElementById("gas-fill").style.width = "0%";
  }
}

updateGas();
setInterval(updateGas, 30000);