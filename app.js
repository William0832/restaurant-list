// Set params
const port = 3000

// Load module and file
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./file/restaurant.json').results

// Set express module
const app = express()

// Set express handlebars module
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // define engine and its layout
app.set('view engine', 'handlebars') // set engine

// Set static file directory / Tell express where to find
app.use(express.static('public'))

// Set route
app.get('/', (req, res) => {
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
