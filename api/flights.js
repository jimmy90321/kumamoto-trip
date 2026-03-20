// Vercel API route for SerpApi
module.exports = async function handler(req, res) {
  const { departure_id, arrival_id, departure_date, return_date } = req.query;

  if (!departure_id || !arrival_id || !departure_date || !return_date) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const apiKey = process.env.SERPAPI_KEY;
  
  try {
    // First get flight options using SerpApi
    const searchUrl = `https://serpapi.com/search?engine=google_flights&departure_id=${departure_id}&arrival_id=${arrival_id}&gl=tw&hl=zh-TW&currency=TWD&departure_date=${departure_date}&return_date=${return_date}&api_key=${apiKey}`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
