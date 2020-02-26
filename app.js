// Set params
const port = 3000

// Load module and file
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const restaurantList = require('./file/restaurant.json').results
const Restaurant = require('./models/restaurant.js')

// Set express module
const app = express()

// Set express handlebars module
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // define engine and its layout
app.set('view engine', 'handlebars') // set engine
app.use(bodyParser.urlencoded({ extended: true })) // Tell express to use body-parser template engine
app.use(express.static('public')) // Tell express where to find static file directory

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
app.get('/', (req, res) => {
  // TODO: 2/26: until here: test user model to select data from db
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      console.log(restaurants)
    })

  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find((restaurant) => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurant, keyword })
})

// Start server and listen it's port
app.listen(port, () => {
  console.log(`Server start and listen to port ${port}`)
})
