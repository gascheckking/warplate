export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    imageUrl: 'https://og.warpai.xyz/gas?t=' + Date.now(),
    altText: 'WarpAI Gas Tracker | Base Network'
  }));
};