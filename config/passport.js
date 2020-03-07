const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) return done(null, false, { message: '此電子郵件沒有註冊過，禁止登入' })
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return console.log(err)
            if (!isMatch) return done(null, false, { message: 'Email and Password incorrect' })
            return done(null, user)
          })
        })
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: '656867221765348',
      clientSecret: 'b3a179332970d17547f89a53b3819767',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (!user) {
            // 產生密碼
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              if (err) return console.log(err)
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                if (err) return console.log(err)
                const newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save()
                  .then((user) => done(null, user))
                  .catch((err) => console.log(err))
              })
            })
          }
        })
        .catch((err) => console.log(err))
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })
}
