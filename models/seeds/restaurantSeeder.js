// require modules and files
const mongoose = require('mongoose')
const restaurantList = require('../../file/restaurant.json').results
const Restaurant = require('../restaurant.js')

// DB
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  // 資料處理 (mongodb 會自動新增每個 document 的 _id，故先去掉 json file 裡給的編號)
  restaurantList.forEach((restaurant) => delete restaurant.id)

  for (let i = 0; i < restaurantList.length; i++) {
    // console.log(restaurantList[i].id)
    Restaurant.create(restaurantList[i])
  }

  console.log('done')
})