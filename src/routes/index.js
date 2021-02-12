const express = require('express')
const nodemailer = require('nodemailer')

const ensureAuth = require('../middleware/ensureAuth')

const Template = require('../db/models/Template')

const router = express.Router()

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

router.get('/send', ensureAuth, (req, res) => {
  res.render('send', { templates: req.user.getTemplates() })
})

router.post('/send', ensureAuth, (req, res) => {
  const { to, files, subject, body } = req.body

  console.log(to)

  req.user.email = '***REMOVED***'

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: req.user.email,
      serviceClient: process.env.GOOGLE_SERVICE_CLIENT_ID,
      privateKey: process.env.GOOGLE_SERVICE_KEY
    }
  })

  to.split(/, ?/g).forEach((email) => {
    transport
      .sendMail({
        from: req.user.email,
        to: email,
        subject: subject,
        html: body
      })
      .then((mailRes) => {
        console.log(mailRes)
        res.end('Message sent successfully')
      })
      .catch(console.error)
  })
})

router.get('/login', (req, res) => {
  res.redirect('/auth/google')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.end('Logged out successfully!')
})

module.exports = router
