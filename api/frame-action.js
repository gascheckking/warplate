export default async (req, res) => {
  const { untrustedData } = req.body;
  
  // Base Network config
  const CONTRACT_ADDRESS = "0x8ab57bdfc4e900b62f309bfaa6e1802755330ca6";
  const VALIDATOR_ADDRESS = "0xValidatorContract";
  const CLAIM_SELECTOR = "0x9e281a98";

  try {
    // Knapp 1: Visa gaspris
    if (untrustedData.buttonIndex === 1) {
      return res.json({
        type: 'message',
        message: '✅ Använd WarpAI-appen för live-data'
      });
    }

    // Knapp 2: Claim WARP
    if (untrustedData.buttonIndex === 2) {
      return res.json({
        type: 'tx',
        chainId: 'eip155:8453',
        method: 'eth_sendTransaction',
        params: {
          to: CONTRACT_ADDRESS,
          data: CLAIM_SELECTOR,
          abi: [{
            "inputs": [{"name":"frameProof","type":"bytes"}],
            "name":"claimDaily",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
          }]
        }
      });
    }

  } catch (error) {
    return res.status(500).json({ error: "WarpAI Error 001" });
  }
};