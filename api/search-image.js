const https = require('https');

// 伴手禮關鍵字映射
const souvenirImageMap = {
  // 熊本
  "陣太鼓": { image: "https://kumamoto.guide/files/92d47b1a-18b6-4486-8a54-b4cdd27a671d_l.jpg", url: "https://kumamoto.guide/spots/detail/14" },
  "譽の陣太后": { image: "https://kumamoto.guide/files/92d47b1a-18b6-4486-8a54-b4cdd27a671d_l.jpg", url: "https://kumamoto.guide/spots/detail/14" },
  "芥末蓮根": { image: "https://kumamoto.guide/files/a8a9d645-c8d4-401d-8b4d-78ca652cb964_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_04.html" },
  "蓮根": { image: "https://kumamoto.guide/files/a8a9d645-c8d4-401d-8b4d-78ca652cb964_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_04.html" },
  "武者返": { image: "https://47okashi.com/wp-content/uploads/2022/11/【無料有料】ウェブ商品写真-3.png", url: "https://47okashi.com/info/mushagaeshi/" },
  "明蝦煎餅": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "車えび": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "天草": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "南阿蘇啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "阿蘇啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "阿蘇牛奶": { image: "https://kumamoto.guide/files/9ef73e78-facd-4d48-a1ab-abeaedc5d227_l.jpg", url: "https://kumamoto.guide/spots/detail/19533" },
  "來民澀團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "熊本熊": { image: "https://kumamoto.guide/files/1d1123f1-727e-4c32-a21e-1eeab9280ba2_l.jpg", url: "https://kumamoto.guide/spots/detail/5898" },
  "栗千里": { image: "https://kumamoto.guide/files/347e9a52-3782-4eaf-af25-381d250908fd_l.jpg", url: "https://kumamoto.guide/spots/detail/15" },
  "突然團子": { image: "https://kumamoto.guide/files/c7bf5235-1c71-4a01-9f25-4dcff9c339cf_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_07.html" },
  "太平燕": { image: "https://kumamoto.guide/files/c9e4cc06-ca9e-4596-b7aa-911e88977c4a_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_03.html" },
  "阿蘇牛": { image: "https://kumamoto.guide/files/cb5d8f5a-6ae1-41be-84d8-cdb3b5710422_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_02.html" },
  "拉麵": { image: "https://kumamoto.guide/files/6908e4fc-aea1-4033-98e1-0907f05c9db7_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_01.html" },
  "通潤橋": { image: "https://kumamoto.guide/files/4d2c1df0-1432-4d2b-a1c5-42e83d1a1e57_l.jpg", url: "https://kumamoto.guide/spots/detail/17" },
  
  // 日本著名伴手禮
  "抹茶": { image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300", url: "https://zh.wikipedia.org/wiki/抹茶" },
  "綠茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/靜岡茶" },
  "東京芭娜娜": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://ja.wikipedia.org/wiki/東京ばなな" },
  "白色戀人": { image: "https://images.unsplash.com/photo-1548741487-18d363dc4469?w=300", url: "https://ja.wikipedia.org/wiki/白い恋人" },
  "royce": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://ja.wikipedia.org/wiki/ロイズ" },
  "大福": { image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=300", url: "https://zh.wikipedia.org/wiki/大福" },
  "羊羹": { image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d48c?w=300", url: "https://zh.wikipedia.org/wiki/羊羹" },
  
  // 台灣
  "鳳梨酥": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/鳳梨酥" },
  "太陽餅": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/太陽餅" },
  "牛軋糖": { image: "https://images.unsplash.com/photo-1581798258726-78c61c724b91?w=300", url: "https://zh.wikipedia.org/wiki/牛軋糖" },
  
  // 甜點
  "巧克力": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://zh.wikipedia.org/wiki/巧克力" },
  "餅乾": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/餅乾" },
  "草莓": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/草莓" },
  "蘋果": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/蘋果" }
};

// 使用 Bing 搜尋 API (免費的)
function searchBingImage(keyword) {
  return new Promise((resolve, reject) => {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(keyword)}&form=HDRSC2&first=1&count=1`;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // 從 Bing HTML 中提取第一張圖片
          const imgMatch = data.match(/murl":"(https:\/\/[^"]+)"/);
          if (imgMatch && imgMatch[1]) {
            resolve({
              image: imgMatch[1],
              url: "https://www.bing.com"
            });
          } else {
            reject(new Error('No image found'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: '名稱不能為空' });
  }
  
  // 1. 精確匹配
  if (souvenirImageMap[name]) {
    return res.json(souvenirImageMap[name]);
  }
  
  // 2. 模糊匹配
  for (const [key, value] of Object.entries(souvenirImageMap)) {
    if (name.includes(key) || key.includes(name)) {
      return res.json(value);
    }
  }
  
  // 3. 沒有找到 → 用 Bing 搜尋真正的圖片
  try {
    const result = await searchBingImage(name);
    return res.json(result);
  } catch (e) {
    // 4. 真的找不到 → 回傳錯誤
    return res.status(404).json({ 
      error: '找不到相關圖片，請從上方推薦項目新增',
      suggestion: '可嘗試：抹茶、鳳梨酥、綠茶、巧克力等關鍵字'
    });
  }
};
