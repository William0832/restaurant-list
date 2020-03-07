const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }),
  (req, res) => {
    res.redirect('/')
  })

router.get('/register', (req, res) => {
  res.render('users/register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  User.findOne({ email })
    .then((user) => {
      if (user) return res.render('register', { name, email, password, password2 })
      const newUser = new User({
        name,
        email,
        password
      })

      newUser.save()
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
