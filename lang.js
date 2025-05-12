const translations = {
  en: {
    gasTitle: "⛽ ETH Base Fee",
    gasStatus: "ETH Base Fee:",
    connectWallet: "Connect Wallet",
    labels: ["Low", "Avg", "High"]
  },
  sv: {
    gasTitle: "⛽ ETH Basavgift",
    gasStatus: "ETH Basavgift:",
    connectWallet: "Anslut Plånbok",
    labels: ["Låg", "Medel", "Hög"]
  }
};

export function updateLanguage(lang) {
  // Uppdatera alla element med data-translate
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  // Uppdatera gas-labels
  document.querySelectorAll('.gas-labels span').forEach((span, i) => {
    span.textContent = translations[lang].labels[i];
  });

  // Uppdatera connect-knapp
  document.getElementById('connect-wallet').textContent = 
    translations[lang].connectWallet;
}

// Språkknappar
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateLanguage(btn.dataset.lang);
  });
});
