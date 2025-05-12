// Initiera fliksystem
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    // Ta bort aktiv klass från alla
    document.querySelectorAll('.nav-item, .tab-content').forEach(el => {
      el.classList.remove('active');
    });
    
    // Aktivera vald flik
    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
  });
});

// Simulera realtidsgaspris
function updateGas() {
  const gasFill = document.querySelector('.gas-fill');
  const gweiDisplay = document.querySelector('.gwei');
  const usdDisplay = document.querySelector('.usd');
  
  fetch('https://api.owlracle.info/v4/base/gas?apikey=demo')
    .then(response => response.json())
    .then(data => {
      const gwei = data.speeds[1].estimatedFee.toFixed(1);
      gasFill.style.width = `${Math.min(gwei, 100)}%`;
      gweiDisplay.textContent = `${gwei} Gwei`;
      usdDisplay.textContent = `≈ $${(gwei * 0.027).toFixed(2)}`; // Simulerad konvertering
    });
}

// Uppdatera var 30:e sekund
setInterval(updateGas, 30000);
updateGas(); // Initial update
