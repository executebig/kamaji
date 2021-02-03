const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  console.log(req.user)
  res.render('index', { user: req.user })
})

router.get('/login', (req, res) => {
  res.redirect('/auth/google')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.end('Logged out successfully!')
})

module.exports = router
