// Set params
const port = 3000

// Load module and file
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant.js')

// Set express module
const app = express()

// Set express handlebars module
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // define engine and its layout
app.set('view engine', 'handlebars') // set engine
app.use(bodyParser.urlencoded({ extended: true })) // Tell express to use body-parser template engine
app.use(express.static('public')) // Tell express where to find static file directory
app.use(methodOverride('_method')) // Tell express to use method override

// DB
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// === Routes ===
// 使用者可以瀏覽全部所有餐廳
app.get('/', (req, res) => {
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

// 使用者可以新增一家餐廳
app.get('/restaurants/new', (req, res) => {
  res.render('edit', { action: '/restaurants' })
})
app.post('/restaurants', (req, res) => {
  // 檢查: 每個欄位都是必填
  const blankCount = Object.values(req.body).filter((value) => value === '').length
  if (blankCount > 0) {
    const message = `尚有 ${blankCount}個欄位沒有填寫，請檢查！`
    return res.render('edit', { restaurant: req.body, message })
  }

  const restaurant = new Restaurant(req.body)
  // console.log(restaurant) // initialize 的當下，就會給一個 _id 了欸
  restaurant.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 使用者可以瀏覽一家餐廳的詳細資訊
app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.log(err)
      return res.render('detail', { restaurant })
    })
})

// 使用者可以修改一家餐廳的資訊
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.log(err)
      return res.render('edit', { restaurant, action: `/restaurants/${restaurant._id}/?_method=PUT` })
    })
})
app.put('/restaurants/:restaurant_id', (req, res) => {
  // 檢查: 每個欄位都是必填
  const blankCount = Object.values(req.body).filter((value) => value === '').length
  if (blankCount > 0) {
    const message = `尚有 ${blankCount}個欄位沒有填寫，請檢查！`
    return res.render('edit', { restaurant: req.body, message })
  }

  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    // 塞值
    Object.entries(restaurant._doc).forEach(([key, value]) => {
      if (key === '_id') return
      restaurant[key] = (req.body[key]) ? req.body[key] : restaurant[key]
    })
    // 寫入
    restaurant.save((err) => {
      if (err) return console.log(err)
      return res.redirect(`/restaurants/${req.params.restaurant_id}`)
    })
  })
})

// 使用者可以刪除一家餐廳
app.delete('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove((err) => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

// 使用者可以搜尋餐廳
app.get('/search', (req, res) => {
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

// Start server and listen it's port
app.listen(port, () => {
  console.log(`Server start and listen to port ${port}`)
})
