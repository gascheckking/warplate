export default async (req, res) => {
  const { untrustedData } = req.body;

  // Validera Farcaster Frame Data
  if (!untrustedData?.fid) {
    return res.status(400).json({ error: "Ogiltig Frame-förfrågan" });
  }

  // Base Network Config
  const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT"; // Ersätt här
  const WARP_CLAIM_SELECTOR = "0x9e281a98"; // claimDaily() function selector

  try {
    // Knapp 1: Visa gaspris
    if (untrustedData.buttonIndex === 1) {
      return res.json({
        type: 'message',
        message: '⚡ Visa gaspriser på warpsi.xyz' // Länka till din huvudsida
      });
    }

    // Knapp 2: Claim WARP
    if (untrustedData.buttonIndex === 2) {
      return res.json({
        type: 'tx',
        chainId: 'eip155:8453', // Base
        method: 'eth_sendTransaction',
        params: {
          abi: [{ 
            "inputs": [],
            "name": "claimDaily",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }],
          to: CONTRACT_ADDRESS,
          data: WARP_CLAIM_SELECTOR,
          value: '0'
        }
      });
    }

  } catch (error) {
    console.error("Frame error:", error);
    return res.status(500).json({ error: "Serverfel" });
  }
};