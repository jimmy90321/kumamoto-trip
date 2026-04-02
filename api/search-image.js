const https = require('https');

// 擴展的伴手禮關鍵字映射 - 更多常見物品
const souvenirImageMap = {
  // 熊本
  "陣太后": { image: "https://kumamoto.guide/files/92d47b1a-18b6-4486-8a54-b4cdd27a671d_l.jpg", url: "https://kumamoto.guide/spots/detail/14" },
  "芥末蓮根": { image: "https://kumamoto.guide/files/a8a9d645-c8d4-401d-8b4d-78ca652cb964_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_04.html" },
  "武者返": { image: "https://47okashi.com/wp-content/uploads/2022/11/【無料有料】ウェブ商品写真-3.png", url: "https://47okashi.com/info/mushagaeshi/" },
  "明蝦煎餅": { image: "http://www.takaraconfect.co.jp/images/products/kurumaebi001.jpg", url: "http://www.takaraconfect.co.jp/commodity_007.html" },
  "南阿蘇啤酒": { image: "https://minamiaso-beer.com/_src/59745543/img20210823104238763043.jpg", url: "https://minamiaso-beer.com/" },
  "阿蘇牛奶": { image: "https://kumamoto.guide/files/9ef73e78-facd-4d48-a1ab-abeaedc5d227_l.jpg", url: "https://kumamoto.guide/spots/detail/19533" },
  "來民澀團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "團扇": { image: "https://kumamoto.guide/files/0a9d6977-82f9-46a6-950a-463f9b0ffc4f_l.jpg", url: "https://kumamoto.guide/spots/detail/19205" },
  "熊本熊": { image: "https://kumamoto.guide/files/1d1123f1-727e-4c32-a21e-1eeab9280ba2_l.jpg", url: "https://kumamoto.guide/spots/detail/5898" },
  "栗千里": { image: "https://kumamoto.guide/files/347e9a52-3782-4eaf-af25-381d250908fd_l.jpg", url: "https://kumamoto.guide/spots/detail/15" },
  "突然團子": { image: "https://kumamoto.guide/files/c7bf5235-1c71-4a01-9f25-4dcff9c339cf_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_07.html" },
  "太平燕": { image: "https://kumamoto.guide/files/c9e4cc06-ca9e-4596-b7aa-911e88977c4a_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_03.html" },
  "阿蘇牛": { image: "https://kumamoto.guide/files/cb5d8f5a-6ae1-41be-84d8-cdb3b5710422_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_02.html" },
  "拉麵": { image: "https://kumamoto.guide/files/6908e4fc-aea1-4033-98e1-0907f05c9db7_s.jpg", url: "https://kumamoto.guide/brand/foods/foods_01.html" },
  
  // 日本著名伴手禮
  "抹茶": { image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300", url: "https://zh.wikipedia.org/wiki/抹茶" },
  "綠茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/靜岡茶" },
  "東京芭娜娜": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://ja.wikipedia.org/wiki/東京ばなな" },
  "白色戀人": { image: "https://images.unsplash.com/photo-1548741487-18d363dc4469?w=300", url: "https://ja.wikipedia.org/wiki/白い恋人" },
  "royce": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://ja.wikipedia.org/wiki/ロイズ" },
  "大福": { image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=300", url: "https://zh.wikipedia.org/wiki/大福" },
  "羊羹": { image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d48c?w=300", url: "https://zh.wikipedia.org/wiki/羊羹" },
  "最中": { image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300", url: "https://zh.wikipedia.org/wiki/最中" },
  "仙貝": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/仙貝" },
  
  // 台灣
  "鳳梨酥": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/鳳梨酥" },
  "太陽餅": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/太陽餅" },
  "牛軋糖": { image: "https://images.unsplash.com/photo-1581798258726-78c61c724b91?w=300", url: "https://zh.wikipedia.org/wiki/牛軋糖" },
  "蛋黃派": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://zh.wikipedia.org/wiki/蛋黃派" },
  
  // 甜點/零食
  "巧克力": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://zh.wikipedia.org/wiki/巧克力" },
  "朱古力": { image: "https://images.unsplash.com/photo-1511381939415-e440db668de3?w=300", url: "https://zh.wikipedia.org/wiki/巧克力" },
  "餅乾": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/餅乾" },
  "曲奇": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/餅乾" },
  "蛋糕": { image: "https://images.unsplash.com/photo-1481391319760-47d736725a87?w=300", url: "https://zh.wikipedia.org/wiki/蛋糕" },
  "草莓": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/草莓" },
  "蘋果": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/蘋果" },
  "香蕉": { image: "https://images.unsplash.com/photo-1571771894821-9b6683c3ca2d?w=300", url: "https://zh.wikipedia.org/wiki/香蕉" },
  "橘子": { image: "https://images.unsplash.com/photo-1514756331096-3448d4c1e8a8?w=300", url: "https://zh.wikipedia.org/wiki/橘子" },
  "葡萄": { image: "https://images.unsplash.com/photo-1537640538962-0e5c3fc15290?w=300", url: "https://zh.wikipedia.org/wiki/葡萄" },
  "西瓜": { image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=300", url: "https://zh.wikipedia.org/wiki/西瓜" },
  
  // 食物
  "米飯": { image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300", url: "https://zh.wikipedia.org/wiki/米飯" },
  "麵包": { image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", url: "https://zh.wikipedia.org/wiki/麵包" },
  "義大利麵": { image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300", url: "https://zh.wikipedia.org/wiki/義大利麵" },
  "披薩": { image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", url: "https://zh.wikipedia.org/wiki/披薩" },
  "漢堡": { image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", url: "https://zh.wikipedia.org/wiki/漢堡" },
  "咖哩": { image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300", url: "https://zh.wikipedia.org/wiki/咖哩" },
  "火鍋": { image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=300", url: "https://zh.wikipedia.org/wiki/火鍋" },
  
  // 飲品
  "奶茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/奶茶" },
  "咖啡": { image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300", url: "https://zh.wikipedia.org/wiki/咖啡" },
  "可樂": { image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300", url: "https://zh.wikipedia.org/wiki/可樂" },
  "果汁": { image: "https://images.unsplash.com/photo-1600270584438-9e5de27d1c2e?w=300", url: "https://zh.wikipedia.org/wiki/果汁" },
  "啤酒": { image: "https://images.unsplash.com/photo-1569923303237-f1c3b03e0d90?w=300", url: "https://zh.wikipedia.org/wiki/啤酒" },
  "紅酒": { image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300", url: "https://zh.wikipedia.org/wiki/紅酒" },
  
  // 3C產品
  "iphone": { image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300", url: "https://zh.wikipedia.org/wiki/IPhone" },
  "手機": { image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", url: "https://zh.wikipedia.org/wiki/手機" },
  "平板": { image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", url: "https://zh.wikipedia.org/wiki/平板電腦" },
  "筆電": { image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", url: "https://zh.wikipedia.org/wiki/筆記型電腦" },
  "相機": { image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300", url: "https://zh.wikipedia.org/wiki/相機" },
  "耳機": { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", url: "https://zh.wikipedia.org/wiki/耳機" },
  
  // 日常用品
  "背包": { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a54?w=300", url: "https://zh.wikipedia.org/wiki/背包" },
  "行李箱": { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a54?w=300", url: "https://zh.wikipedia.org/wiki/行李箱" },
  "太陽眼鏡": { image: "https://images.unsplash.com/photo-1572635196237-14b913f惠22e?w=300", url: "https://zh.wikipedia.org/wiki/太陽眼鏡" },
  "手錶": { image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300", url: "https://zh.wikipedia.org/wiki/手錶" },
  "項鍊": { image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300", url: "https://zh.wikipedia.org/wiki/項鍊" },
  
  // 花卉
  "玫瑰": { image: "https://images.unsplash.com/photo-1518882605630-8eb0c540aeeb?w=300", url: "https://zh.wikipedia.org/wiki/玫瑰" },
  "鬱金香": { image: "https://images.unsplash.com/photo-1520763185298-1b4c098c7bb5?w=300", url: "https://zh.wikipedia.org/wiki/鬱金香" },
  "櫻花": { image: "https://images.unsplash.com/photo-1522383225653-d777b9c79bbe?w=300", url: "https://zh.wikipedia.org/wiki/櫻花" },
  "蓮花": { image: "https://images.unsplash.com/photo-1507608616759-3f2b84d65afe?w=300", url: "https://zh.wikipedia.org/wiki/蓮花" },
  
  // 風景
  "海灘": { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300", url: "https://zh.wikipedia.org/wiki/海灘" },
  "山": { image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300", url: "https://zh.wikipedia.org/wiki/山" },
  "日落": { image: "https://images.unsplash.com/photo-1495616811223-99d2aaee6ea9?w=300", url: "https://zh.wikipedia.org/wiki/日落" },
  "夜景": { image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300", url: "https://zh.wikipedia.org/wiki/夜景" },
  
  // 化妝品/保養品
  "面膜": { image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300", url: "https://zh.wikipedia.org/wiki/面膜" },
  "保養品": { image: "https://images.unsplash.com/photo-1571781535014-53bd9429f636?w=300", url: "https://zh.wikipedia.org/wiki/護膚品" },
  "化妝品": { image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=300", url: "https://zh.wikipedia.org/wiki/化妝品" },
  "香水": { image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300", url: "https://zh.wikipedia.org/wiki/香水" },
  "口紅": { image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300", url: "https://zh.wikipedia.org/wiki/口紅" },
  "乳液": { image: "https://images.unsplash.com/photo-1571781535014-53bd9429f636?w=300", url: "https://zh.wikipedia.org/wiki/乳液" },
  "洗面乳": { image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300", url: "https://zh.wikipedia.org/wiki/洗面乳" },
  
  // 更多常見物品
  "衣服": { image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300", url: "https://zh.wikipedia.org/wiki/衣服" },
  "鞋子": { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", url: "https://zh.wikipedia.org/wiki/鞋子" },
  "襪子": { image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300", url: "https://zh.wikipedia.org/wiki/襪子" },
  "帽子": { image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=300", url: "https://zh.wikipedia.org/wiki/帽子" },
  "圍巾": { image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300", url: "https://zh.wikipedia.org/wiki/圍巾" },
  "手套": { image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=300", url: "https://zh.wikipedia.org/wiki/手套" },
  "包包": { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300", url: "https://zh.wikipedia.org/wiki/包_(容器)" },
  "錢包": { image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300", url: "https://zh.wikipedia.org/wiki/錢包" },
  
  // 玩具/公仔
  "玩具": { image: "https://images.unsplash.com/photo-1558060370-d46a5807d6c7?w=300", url: "https://zh.wikipedia.org/wiki/玩具" },
  "公仔": { image: "https://images.unsplash.com/photo-1608889825103-eb5ed705b11c?w=300", url: "https://zh.wikipedia.org/wiki/卡通公仔" },
  "模型": { image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300", url: "https://zh.wikipedia.org/wiki/模型" },
  "扭蛋": { image: "https://images.unsplash.com/photo-1608889825103-eb5ed705b11c?w=300", url: "https://zh.wikipedia.org/wiki/扭蛋" },
  
  // 文具
  "筆記本": { image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300", url: "https://zh.wikipedia.org/wiki/筆記本" },
  "筆": { image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300", url: "https://zh.wikipedia.org/wiki/筆" },
  "橡皮擦": { image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300", url: "https://zh.wikipedia.org/wiki/橡皮擦" },
  
  // 珠寶
  "戒指": { image: "https://images.unsplash.com/photo-1605100804763-eb5ed705b11c?w=300", url: "https://zh.wikipedia.org/wiki/戒指" },
  "手環": { image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300", url: "https://zh.wikipedia.org/wiki/手環" },
  "耳環": { image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300", url: "https://zh.wikipedia.org/wiki/耳環" },
  
  // 零食
  "糖果": { image: "https://images.unsplash.com/photo-1581798258726-78c61c724b91?w=300", url: "https://zh.wikipedia.org/wiki/糖果" },
  "果凍": { image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300", url: "https://zh.wikipedia.org/wiki/果凍" },
  "布丁": { image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", url: "https://zh.wikipedia.org/wiki/布丁" },
  "冰淇淋": { image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300", url: "https://zh.wikipedia.org/wiki/冰淇淋" },
  "優格": { image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300", url: "https://zh.wikipedia.org/wiki/酸奶" },
  
  // 茶
  "烏龍茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/烏龍茶" },
  "鐵觀音": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/鐵觀音" },
  "普洱茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/普洱茶" },
  "菊花茶": { image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300", url: "https://zh.wikipedia.org/wiki/菊花茶" },
  
  // 調味料
  "醬油": { image: "https://images.unsplash.com/photo-1590592228283-e4b9d7c4f01d?w=300", url: "https://zh.wikipedia.org/wiki/醬油" },
  "鹽": { image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300", url: "https://zh.wikipedia.org/wiki/鹽" },
  "胡椒": { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300", url: "https://zh.wikipedia.org/wiki/胡椒" },
  "糖": { image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300", url: "https://zh.wikipedia.org/wiki/糖" },
  
  // 其他
  "傘": { image: "https://images.unsplash.com/photo-1527212884579-2b2f52b07a5a?w=300", url: "https://zh.wikipedia.org/wiki/傘" },
  "杯子": { image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300", url: "https://zh.wikipedia.org/wiki/杯子" },
  "馬克杯": { image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300", url: "https://zh.wikipedia.org/wiki/馬克杯" },
  "環保袋": { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a54?w=300", url: "https://zh.wikipedia.org/wiki/環保袋" },
  "伴手禮": { image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300", url: "https://zh.wikipedia.org/wiki/伴手禮" },
  "禮物": { image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300", url: "https://zh.wikipedia.org/wiki/禮物" }
};

// 從維基百科 REST API 獲取圖片
function searchWikipedia(keyword) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'zh.wikipedia.org',
      path: `/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'KumamotoTrip/1.0 (kumamoto-trip.vercel.app)'
      }
    };
    
    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.thumbnail) {
            resolve({ image: json.thumbnail.source, url: json.content_urls?.desktop?.page || '' });
          } else {
            reject(new Error('No image'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

module.exports = async (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: '名稱不能為空' });
  }
  
  const searchName = name.toLowerCase().trim();
  
  // 1. 精確匹配
  if (souvenirImageMap[searchName]) {
    return res.json(souvenirImageMap[searchName]);
  }
  
  // 2. 模糊匹配
  for (const [key, value] of Object.entries(souvenirImageMap)) {
    if (searchName.includes(key) || key.includes(searchName)) {
      return res.json(value);
    }
  }
  
  // 3. 維基百科搜尋
  try {
    const result = await searchWikipedia(name);
    return res.json(result);
  } catch (e) {
    return res.json({ image: null, url: "", message: '請在客戶端搜尋維基百科' });
  }
};
