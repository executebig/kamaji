const express = require('express')
const Template = require('../db/models/Template')
const router = express.Router()

const ensureAuth = require('../middleware/ensureAuth')

router.get('/', (req, res, next) => {
  res.render('index', { user: req.user })
})

router.get('/templates', ensureAuth, async (req, res) => {
  const templates = await req.user.getTemplates()
  res.render('templates', { templates })
})

router.post('/templates', ensureAuth, async (req, res) => {
  // TODO: Serverside engine checks
  const { content, engine } = req.body

  req.user.addTemplate(
    await Template.create({
      content,
      engine
    })
  )

  res.redirect('/templates')
})

router.get('/login', (req, res) => {
  res.redirect('/auth/google')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.end('Logged out successfully!')
})

module.exports = router
