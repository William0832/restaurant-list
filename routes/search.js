const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 使用者可以搜尋餐廳
router.get('/', (req, res) => {
  // 去 DB 用 SQL LIKE 找 data ({欄位名稱: {LIKE: %keyword%}})，ignore 大小寫
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: '.*' + keyword + '.*', $options: 'i' } })
    .lean()
    .exec((err, restaurant) => {
      console.log(restaurant)
      if (err) return console.log(err)
      return res.render('index', { restaurant, keyword })
    })
})

module.exports = router
