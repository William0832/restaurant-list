const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 使用者可以瀏覽全部所有餐廳
router.get('/', (req, res) => {
  const script = `
  <script>
  const cardContent = document.getElementById('card-content')
  cardContent.addEventListener('click', () => {
    if (event.target.dataset.type === "delete-btn") {
      if (confirm('刪除後即無法復原，您確定要刪除此餐廳嗎？')) {
        event.target.closest('.delete-restaurant-form').submit()
      }
    }
  })
  </script>
  `

  Restaurant.find() // 查找資料
    .lean() // 整理資料
    .exec((err, restaurants) => { // 抓回資料
      if (err) return console.log(err)
      res.render('index', { restaurant: restaurants, script })
    })
})

module.exports = router
