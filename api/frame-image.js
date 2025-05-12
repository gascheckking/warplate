// api/frame-image.js
export default async (req, res) => {
  // Hämta live gaspriser från Owlracle API
  const gasData = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo')
    .then(res => res.json())
    .catch(() => ({ speeds: [{ estimatedFee: 0 }] }));

  const gwei = gasData.speeds[1]?.estimatedFee?.toFixed(1) || '--';
  const mood = gwei < 30 ? '😎' : gwei < 70 ? '🔥' : '💀';

  // Dynamisk OG-bild med gasdata
  const imageUrl = `https://og-image-generator.com/warpai-frame?template=gas-tracker&gwei=${gwei}&mood=${mood}&date=${Date.now()}`;
  
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({
    imageUrl,
    altText: `Live Gas på Base: ${gwei} Gwei ${mood} | WarpAI`
  }));
};