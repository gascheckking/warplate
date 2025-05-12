function getRewardTier(address user) public view returns (uint256) {
  uint256 userXp = xp[user];
  if (userXp >= 1000) return 3; // Diamond
  if (userXp >= 500) return 2;  // Gold
  if (userXp >= 100) return 1;  // Silver
  return 0;                     // Bronze
}