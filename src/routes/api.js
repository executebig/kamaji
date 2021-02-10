const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const ensureAuth = require('../middleware/ensureAuth')

router.post('/send', ensureAuth, (req, res) => {
  const { emails } = req.user
  const { to, cc, bcc, files, subject, body } = req.body

  const email = emails[0].value

  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: email,
      serviceClient: process.env.GOOGLE_SERVICE_CLIENT_ID,
      privateKey: process.env.GOOGLE_SERVICE_KEY
    }
  }).sendMail({
      from: email,
      to: to,
      subject: subject,
      html: body
    })
    .then((mailRes) => {
      console.log(mailRes)
      res.end('Message sent successfully')
    })
    .catch(console.error)
})

module.exports = router