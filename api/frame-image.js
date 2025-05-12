export default async (req, res) => {
  // Fallback-data
  const defaultData = {
    gwei: '--',
    mood: '⚡'
  };

  // Hämta gasdata med timeout
  const gasData = await Promise.race([
    fetch('https://api.owlracle.info/v4/base/gas?apikey=demo')
      .then(res => res.json())
      .catch(() => defaultData),
    new Promise(resolve => setTimeout(() => resolve(defaultData), 1000))
  ]);

  const gwei = gasData.speeds?.[1]?.estimatedFee?.toFixed(1) || defaultData.gwei;
  const mood = gwei < 30 ? '😎' : gwei < 70 ? '🔥' : '💀';

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    imageUrl: `https://og-image.warpai.xyz/gas?price=${gwei}&mood=${mood}&t=${Date.now()}`,
    altText: `Base Gas: ${gwei} Gwei | Klicka för att claima $WARP`
  }));
};