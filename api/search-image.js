const https = require('https');

// 嘗試從 Lorem Picsum 獲取隨機圖片
function searchImage(keyword) {
  return new Promise((resolve, reject) => {
    // 使用 picsum.photos 關鍵字搜尋
    const url = `https://loremflickr.com/300/300/${encodeURIComponent(keyword)}?random=${Date.now()}`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve({
          image: url,
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
