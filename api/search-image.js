const https = require('https');

// 嘗試從Unsplash獲取圖片
function searchUnsplash(query) {
  return new Promise((resolve, reject) => {
    const imageUrl = `https://source.unsplash.com/300x300/?${encodeURIComponent(query)}`;
    
    https.get(imageUrl, (res) => {
      if (res.statusCode === 200) {
        resolve({
          image: imageUrl,
          url: "https://unsplash.com"
        });
      } else {
        reject(new Error('No image'));
      }
    }).on('error', reject);
  });
}

// 嘗試從圖片儲存庫獲取
function searchImageStorage(keyword) {
  return new Promise((resolve, reject) => {
    // 使用 picsum.photos 作為備用
    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(keyword)}/300/300`;
    
    https.get(imageUrl, (res) => {
      if (res.statusCode === 200) {
        resolve({
          image: imageUrl,
          url: "https://picsum.photos"
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
  
  // 先嘗試 Unsplash
  try {
    const result = await searchUnsplash(name);
    return res.json(result);
  } catch (e) {
    // Unsplash 失敗，嘗試 picsum
    try {
      const result = await searchImageStorage(name);
      return res.json(result);
    } catch (e2) {
      // 都失敗
      return res.json({
        image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(name)}`,
        url: ""
      });
    }
  }
};
