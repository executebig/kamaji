const express = require('express')
const Mustache = require('mustache')

const ensureAuth = require('../middleware/ensureAuth')

const User = require('../db/models/User')
const Template = require('../db/models/Template')

const router = express.Router()

router.get('/', ensureAuth, (req, res) => {
  res.render('send', { templates: req.user.getTemplates() })
})

router.post('/', ensureAuth, (req, res) => {
  // TODO: Email scheduling w/ cronjob
  const { to, files, subject, body } = req.body

  req.user.email = '***REMOVED***'

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    pool: true,
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

module.exports = router
