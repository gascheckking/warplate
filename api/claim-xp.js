const users = new Map();

export default async function handler(req, res) {
  const { address } = req.body;
  const now = Date.now();
  const oneDay = 86400000;

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Ogiltig wallet-address' });
  }

  if (!users.has(address)) {
    users.set(address, {
      xp: 0,
      streak: 0,
      lastClaim: 0
    });
  }

  const user = users.get(address);
  const sinceLast = now - user.lastClaim;

  if (sinceLast < oneDay) {
    return res.status(400).json({ error: 'Redan claimat idag' });
  }

  user.lastClaim = now;
  user.streak = sinceLast < oneDay * 2 ? user.streak + 1 : 1;
  const reward = 10 + user.streak * 2;
  user.xp += reward;

  res.status(200).json({
    address,
    xp: user.xp,
    streak: user.streak,
    reward
  });
}
