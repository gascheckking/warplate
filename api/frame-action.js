// api/frame-action.js
export default async (req, res) => {
  const { untrustedData } = req.body;

  // Base Network config
  const CONTRACT_ADDRESS = "0x8ab57bdfc4e900b62f309bfaa6e1802755330ca6"; // Ersätt med ditt kontrakt
  const GAS_API = "https://api.owlracle.info/v4/base/gas?apikey=demo";

  try {
    // Knapp 1: Visa live gaspris
    if (untrustedData.buttonIndex === 1) {
      const gasData = await fetch(GAS_API).then(res => res.json());
      const gwei = gasData.speeds[1].estimatedFee.toFixed(1);
      
      return res.json({
        type: 'message',
        message: `⚡ ${gwei} Gwei på Base ${gwei < 30 ? '😎' : '🔥'}`
      });
    }

    // Knapp 2: Claim WARP
    if (untrustedData.buttonIndex === 2) {
      return res.json({
        type: 'tx',
        chainId: 'eip155:8453', // Base
        method: 'eth_sendTransaction',
        params: {
          to: CONTRACT_ADDRESS,
          data: '0x9e281a98', // claimDaily() function selector
          value: '0x0' // No ETH needed
        }
      });
    }

  } catch (error) {
    console.error("Frame error:", error);
    return res.status(500).json({ error: "Något gick fel" });
  }
};