// Visa XP i UI
async function updateXp(walletAddress) {
  const xp = await warpContract.xp(walletAddress);
  document.getElementById("xp-counter").textContent = `XP: ${xp}`;
}

// Koppla till claim-knapp
document.getElementById("claim-btn").addEventListener("click", async () => {
  const tx = await warpContract.claimDaily();
  await tx.wait();
  updateXp(userWalletAddress); // Uppdatera XP efter claim
});