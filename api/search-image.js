const https = require('https');

// 從 loremflickr 獲取圖片
function searchImage(keyword) {
  return new Promise((resolve, reject) => {
    // loremflickr 會自動導航到隨機圖片
    const url = `https://loremflickr.com/300/300/all?lock=${Math.floor(Math.random() * 1000)}`;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode === 302 || res.statusCode === 200) {
        // 獲取實際的圖片 URL
        const imageUrl = res.headers.location || url;
        resolve({
          image: imageUrl,
          url: "https://loremflickr.com"
        });
      } else {
        reject(new Error('No image'));
      }
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: '名稱不能為空' });
  }
  
  // 嘗試從 loremflickr 搜尋
  try {
    const result = await searchImage(name);
    return res.json(result);
  } catch (e) {
    // 失敗使用 placeholder
    return res.json({
      image: `https://via.placeholder.com/300x200/e0e0e0/666666?text=${encodeURIComponent(name)}`,
      url: ""
    });
  }
};
