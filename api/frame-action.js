
export default async function handler(req, res) {
  const { address } = req.body || {};
  if (!address) return res.status(400).json({ error: 'No address provided' });
  return res.status(200).json({ xp: 1234, streak: 5 });
}
