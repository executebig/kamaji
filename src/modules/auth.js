require('dotenv').config()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../db/models/User')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, cb) => {
      const [user, created] = await User.findOrCreate({
        where: { authorityId: profile.id },
        defaults: {
          authorityId: profile.id
        }
      })

      cb(null, user)
    }
  )
)

passport.serializeUser(async (user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  user = await User.findOne({ where: { id } })
  cb(null, user)
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
