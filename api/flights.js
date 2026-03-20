// Vercel API route for SerpApi
module.exports = async function handler(req, res) {
  const { departure_id, arrival_id, outbound_date, return_date } = req.query;

  if (!departure_id || !arrival_id || !outbound_date || !return_date) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const apiKey = process.env.SERPAPI_KEY;
  
  try {
    // Step 1: Search flights - this returns a search_id
    const searchUrl = `https://serpapi.com/search?engine=google_flights&departure_id=${departure_id}&arrival_id=${arrival_id}&gl=tw&hl=zh-TW&currency=TWD&outbound_date=${outbound_date}&return_date=${return_date}&api_key=${apiKey}`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    // Check if we got results directly
    if (searchData.best_flights || searchData.other_flights) {
      return res.status(200).json(searchData);
    }
    
    // If we got a search_id, we need to poll for results
    if (searchData.search_id) {
      // Wait a bit for results
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const resultsUrl = `https://serpapi.com/searches/${searchData.search_id}.json?api_key=${apiKey}`;
      const resultsResponse = await fetch(resultsUrl);
      const resultsData = await resultsResponse.json();
      
      return res.status(200).json(resultsData);
    }
    
    // If no flights found
    if (searchData.error) {
      return res.status(500).json({ error: searchData.error });
    }
    
    return res.status(200).json(searchData);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
