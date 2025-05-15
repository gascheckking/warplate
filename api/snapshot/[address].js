
export default function handler(req, res) {
  const { address } = req.query;

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.status(400).send(`<svg width="600" height="100"><rect width="100%" height="100%" fill="#dc2626"/><text x="50%" y="50%" fill="#fff" font-size="16" text-anchor="middle">Ogiltig wallet</text></svg>`);
  }

  const svg = `
  <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#1e293b"/>
    <text x="50%" y="40" fill="#fff" font-size="24" text-anchor="middle">Warp Snapshot</text>
    <text x="50%" y="100" fill="#38bdf8" font-size="18" text-anchor="middle">${address}</text>
    <text x="50%" y="160" fill="#94a3b8" font-size="16" text-anchor="middle">XP: 1420 | Rank: 23 | Gas: 0.42 ETH</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
}
