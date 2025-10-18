// api/shorten.js
export default async function handler(req, res) {
  const { link } = req.query;
  const apiToken = process.env.ARKLINKS_TOKEN; // ahora se lee desde Vercel

  if (!link) {
    return res.status(400).json({ error: "Falta el parámetro link" });
  }

  try {
    const response = await fetch(
      `https://arlinks.in/api?api=${apiToken}&url=${encodeURIComponent(link)}&format=text`
    );

    const shortUrl = await response.text();

    res.status(200).json({
      short: shortUrl.trim(),
      original: link
    });
  } catch (err) {
    res.status(500).json({ error: "Error al acortar enlace" });
  }
}
