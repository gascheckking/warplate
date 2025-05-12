
export default function handler(req, res) {
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(Buffer.from([]));
}
