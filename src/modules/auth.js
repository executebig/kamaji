require('dotenv').config()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/callback`
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile)
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/'
    })
  )
}
