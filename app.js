// Set params
const port = 3000

// Load module and file
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// Set express module
const app = express()

// Set express handlebars module
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // define engine and its layout
app.set('view engine', 'handlebars') // set engine

app.use(bodyParser.urlencoded({ extended: true })) // Use body-parser to parse POST data
app.use(express.static('public')) // Where to find static file directory
app.use(methodOverride('_method')) // Use method-override to make RESTful routes

// Use Router to deal with routes
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))

// DB
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// Start server and listen it's port
app.listen(port, () => {
  console.log(`Server start and listen to port ${port}`)
})
