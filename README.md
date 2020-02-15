# Restaurant List
每天都在煩惱要吃什麼嗎？這是個用 [Node.js](https://nodejs.org/en/)、[Express](https://expressjs.com/)、[Express-Handlebars](https://www.npmjs.com/package/express-handlebars) 打造的網站，收集了數間餐廳的資料，使用者藉由名稱搜尋、查看詳細資料，快速找到可去的餐廳。美食不等人，即刻查詢，立即出發！

![scrrenshot](https://github.com/JessieMosbi/restaurant-list/blob/master/features.gif?raw=true)

## Requirement
[Node.js](https://nodejs.org/en/)

## Installing
透過 `gti clone` 指令將專案下載下來到本機端
```console
git clone https://github.com/JessieMosbi/restaurant-list
```

開啟終端機 (Terminal)，進入 restaurant-list 資料夾內，並檢查是否有 package.json 檔案
```console
cd {Your download destination}/restaurant-list
```

執行 `num install`，將專案所需套件下載下來
```console
num install
```

套件安裝完畢後，用專案所設定的統一指令，即可執行專案
```console
npm run dev
```

預設 port 為 3000，請直接打開瀏覽器，並在 URL 輸入 http://localhost:3000/ 即可瀏覽網頁

## Features
+ 首頁查看餐廳資料（包含名稱、分類、評分）
+ 在首頁上方的搜尋方框，輸入名稱搜尋餐廳
+ 點選首頁的餐廳圖片，可查看更詳細的資料（
<i class="fas fa-utensils"></i> 類別、
<i class="fas fa-map-marker-alt"></i> 地址、
<i class="fas fa-mobile-alt"></i> 電話、
<i class="fas fa-star"></i> 評分），
更可點選 <i class="fas fa-location-arrow"></i> 直接進入 Google Map 進行導航

<head>
  <script defer src="https://use.fontawesome.com/releases/v5.12.1/js/all.js"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.12.1/js/v4-shims.js"></script>
</head>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css">