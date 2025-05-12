export async function getGas() {
  const statusEl = document.getElementById("gas-status");
  const fillEl = document.getElementById("gasFill");
  const baseFeeEl = document.getElementById("base-fee");

  if (!statusEl || !fillEl || !baseFeeEl) return;

  try {
    baseFeeEl.textContent = "⌛";
    const response = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await response.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);

    baseFeeEl.textContent = gwei;
    fillEl.style.width = `${Math.min(gwei, 100)}%`;
    statusEl.classList.remove("error");
    
  } catch (error) {
    console.error("Gas Error:", error);
    baseFeeEl.textContent = "0";
    fillEl.style.width = "0%";
    statusEl.classList.add("error");
  }
}
