const translations = {
  en: {
    gasTitle: "⛽ Live Gas Fee",
    claim: "Claim XP"
  },
  sv: {
    gasTitle: "⛽ Gaspris Live",
    claim: "Hämta XP"
  }
};

export function updateLanguage(lang) {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    el.textContent = translations[lang][key];
  });
}
