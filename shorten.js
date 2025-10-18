// api/shorten.js
export default async function handler(req, res) {
  const { link } = req.query;

  // --- CORRECCIÓN 1 ---
  // Leemos el token desde Netlify. 
  // Asegúrate de que el nombre "MI_ACORTADOR_TOKEN" sea EXACTAMENTE 
  // el mismo que usaste en la "Key" de Netlify.
  const apiToken = process.env.MI_ACORTADOR_TOKEN; 

  if (!link) {
    return res.status(400).json({ error: "Falta el parámetro link" });
  }

  // Buena idea: verificar si el token se cargó
  if (!apiToken) {
    console.error("No se pudo cargar MI_ACORTADOR_TOKEN");
    return res.status(500).json({ error: "Error de configuración del servidor." });
  }

  try {
    // --- CORRECCIÓN 2 ---
    // Usamos la URL de Shrinkme con las variables correctas.
    // 1. Usamos ${apiToken} (la variable) en lugar de pegar el token.
    // 2. Usamos ${encodeURIComponent(link)} para el enlace.
    const response = await fetch(
      `https://shrinkme.io/api?api=${apiToken}&url=${encodeURIComponent(link)}`
    );

    // Shrinkme responde con texto plano, así que .text() es correcto.
    const shortUrl = await response.text();

    res.status(200).json({
      // Recordatorio: lo enviamos como "short"
      short: shortUrl.trim(), 
      original: link
    });
  } catch (err) {
    console.error("Error al acortar:", err);
    res.status(500).json({ error: "Error al acortar enlace" });
  }
}
