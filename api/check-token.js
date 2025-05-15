const cache = new Map();

export default async function handler(req, res) {
  const { address } = req.query;
  const lower = address?.toLowerCase();

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Ogiltig wallet-address' });
  }

  if (!cache.has(lower)) {
    const mockData = {
      '0xa8b817f09702c8d77fdb6d7d677a30cba5c9d7b9': '2025-04-21',
      '0xbc12638e5a84dbd7ef064e307f908343350eeb60': '2025-04-22'
    };

    const isHolder = lower in mockData;
    cache.set(lower, {
      isEarlySupporter: isHolder,
      ogSince: isHolder ? mockData[lower] : null,
      lastUpdated: Date.now()
    });
  }

  res.status(200).json({
    address,
    ...cache.get(lower),
    eligibleForRewards: cache.get(lower).isEarlySupporter
  });
}
