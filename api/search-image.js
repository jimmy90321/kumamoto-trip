const https = require('https');

// 優先匹配的伴手禮映射
const souvenirImageMap = {
  // 熊本
  "陣太鼓": { image: "https://kumamoto.guide/files/92d47b1a-18b6-4486-8a54-b4cdd27a671d_l.jpg", url: "https://kumamoto.guide/spots/detail/14" },
  "譽の陣太鼓": { image: "https://kumamoto.guide/files/92d47b1a-18b6-4486-8a54-b4cdd27a671d_l.jpg", url: "https://kumamoto.guide/spots/detail/14" },
  "芥末蓮根": { image: "https://kumamoto.guide/files/a8a9d645-c8d4-401d-8b4d-78ca652cb964_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_04.html" },
  "蓮根": { image: "https://kumamoto.guide/files/a8a9d645-c8d4-401d-8b4d-78ca652cb964_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_04.html" },
  "武者返": { image: "https://47okashi.com/wp-content/uploads/2022/11/【無料有料】ウェブ商品写真-3.png", url: "https://47okashi.com/info/mushagaeshi/" },
  "武者がえし": { image: "https://47okashi.com/wp-content/uploads/2022/11/【無料有料】ウェブ商品写真-3.png", url: "https://47okashi.com/info/mushagaeshi/" },
  "明蝦煎餅": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "車えび": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "天草": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "南阿蘇啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "阿蘇啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "阿蘇牛奶": { image: "https://kumamoto.guide/files/9ef73e78-facd-4d48-a1ab-abeaedc5d227_l.jpg", url: "https://kumamoto.guide/spots/detail/19533" },
  "牛奶糖": { image: "https://kumamoto.guide/files/9ef73e78-facd-4d48-a1ab-abeaedc5d227_l.jpg", url: "https://kumamoto.guide/spots/detail/19533" },
  "來民澀團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "來民団扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "熊本熊": { image: "https://kumamoto.guide/files/1d1123f1-727e-4c32-a21e-1eeab9280ba2_l.jpg", url: "https://kumamoto.guide/spots/detail/5898" },
  "くまモン": { image: "https://kumamoto.guide/files/1d1123f1-727e-4c32-a21e-1eeab9280ba2_l.jpg", url: "https://kumamoto.guide/spots/detail/5898" },
  "栗千里": { image: "https://kumamoto.guide/files/347e9a52-3782-4eaf-af25-381d250908fd_l.jpg", url: "https://kumamoto.guide/spots/detail/15" },
  "黑糖甜甜圈": { image: "https://kumamoto.guide/files/347e9a52-3782-4eaf-af25-381d250908fd_l.jpg", url: "https://kumamoto.guide/spots/detail/15" },
  "突然團子": { image: "https://kumamoto.guide/files/c7bf5235-1c71-4a01-9f25-4dcff9c339cf_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_07.html" },
  "太平燕": { image: "https://kumamoto.guide/files/c9e4cc06-ca9e-4596-b7aa-911e88977c4a_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_03.html" },
  "阿蘇牛": { image: "https://kumamoto.guide/files/cb5d8f5a-6ae1-41be-84d8-cdb3b5710422_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_02.html" },
  "熊本拉麵": { image: "https://kumamoto.guide/files/6908e4fc-aea1-4033-98e1-0907f05c9db7_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_01.html" },
  "拉麵": { image: "https://kumamoto.guide/files/6908e4fc-aea1-4033-98e1-0907f05c9db7_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_01.html" },
  "通潤橋": { image: "https://kumamoto.guide/files/4d2c1df0-1432-4d2b-a1c5-42e83d1a1e57_l.jpg", url: "https://kumamoto.guide/spots/detail/17" },
  "水前寺": { image: "https://kumamoto.guide/files/f576e48e-1d0e-42e0-87dd-4f517a761796_l.jpg", url: "https://kumamoto.guide/spots/detail/16" },
  
  // 日本著名伴手禮
  "抹茶": { image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300", url: "https://zh.wikipedia.org/wiki/抹茶" },
  "綠茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/靜岡茶" },
  "靜岡茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/靜岡茶" },
  "東京芭娜娜": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://ja.wikipedia.org/wiki/東京ばなな" },
  "白色戀人": { image: "https://images.unsplash.com/photo-1548741487-18d363dc4469?w=300", url: "https://ja.wikipedia.org/wiki/白い恋人" },
  "kitkat": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://ja.wikipedia.org/wiki/キットカット" },
  "royce": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://ja.wikipedia.org/wiki/ロイズ" },
  "生巧克力": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://ja.wikipedia.org/wiki/ロイズ" },
  "大福": { image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=300", url: "https://zh.wikipedia.org/wiki/大福" },
  "銅鑼燒": { image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300", url: "https://ja.wikipedia.org/wiki/どらやき" },
  "羊羹": { image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d48c?w=300", url: "https://zh.wikipedia.org/wiki/羊羹" },
  "最中": { image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300", url: "https://zh.wikipedia.org/wiki/最中" },
  "仙貝": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/仙貝" },
  
  // 台灣
  "鳳梨酥": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/鳳梨酥" },
  "太陽餅": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/太陽餅" },
  "牛軋糖": { image: "https://images.unsplash.com/photo-1581798258726-78c61c724b91?w=300", url: "https://zh.wikipedia.org/wiki/牛軋糖" },
  "蛋黃派": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://zh.wikipedia.org/wiki/蛋黃派" },
  "貢梨": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/梨山蜜梨" },
  "梨山": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/梨山" },
  
  // 茶葉/饮品
  "高山茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/高山茶" },
  "烏龍茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/烏龍茶" },
  "茶葉": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/茶葉" },
  
  // 甜點/零食
  "巧克力": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://zh.wikipedia.org/wiki/巧克力" },
  "糖果": { image: "https://images.unsplash.com/photo-1581798258726-78c61c724b91?w=300", url: "https://zh.wikipedia.org/wiki/糖果" },
  "餅乾": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/餅乾" },
  "蛋糕": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://zh.wikipedia.org/wiki/蛋糕" },
  
  // 水果
  "草莓": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/草莓" },
  "蘋果": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/蘋果" },
  "橘子": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/橘子" }
};

// 從 loremflickr 獲取圖片 - 真正根據關鍵字搜尋
function searchImage(keyword) {
  return new Promise((resolve, reject) => {
    // 使用關鍵字搜尋
    const url = `https://loremflickr.com/300/300/${encodeURIComponent(keyword)}?random=${Date.now()}`;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode === 302 || res.statusCode === 200) {
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
  
  // 1. 精確匹配
  if (souvenirImageMap[name]) {
    return res.json(souvenirImageMap[name]);
  }
  
  // 2. 模糊匹配 - 檢查每個關鍵字
  for (const [key, value] of Object.entries(souvenirImageMap)) {
    if (name.includes(key) || key.includes(name)) {
      return res.json(value);
    }
  }
  
  // 3. 沒有找到 → 真的用名稱去搜尋圖片
  try {
    const result = await searchImage(name);
    return res.json(result);
  } catch (e) {
    // 4. 搜尋失敗，使用 placeholder
    return res.json({
      image: `https://via.placeholder.com/300x200/e0e0e0/666666?text=${encodeURIComponent(name)}`,
      url: ""
    });
  }
};
