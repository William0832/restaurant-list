const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) return done(null, false, { message: '此電子郵件沒有註冊過，禁止登入' })
          if (password !== user.password) return done(null, false)
          return done(null, user)
        })
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
