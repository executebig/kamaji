const express = require('express')
const nodemailer = require('nodemailer')
const Mustache = require('mustache')

const ensureAuth = require('../middleware/ensureAuth')

const Template = require('../db/models/Template')
const Email = require('../db/models/Email')

const router = express.Router()

router.get('/', ensureAuth, async (req, res) => {
  res.render('send', { templates: await req.user.getTemplates() })
})

router.post('/', ensureAuth, async (req, res, next) => {
  let { subject, template, fields, emailKey } = req.body

  try {
    template = await Template.findByPk(template)
    fields = JSON.parse(fields)
    subject = Mustache.render(subject, fields)
  } catch (err) {
    next(err)
  }

  // TODO: Cache transports in memory based on user session
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

  fields.forEach(async ({[emailKey]: email, ...fields }) => {
    const newEmail = await Email.create({
      to: email,
      fields: fields
    })

    req.user.addEmail(newEmail)
    template.addEmail(newEmail)

    transport
      .sendMail({
        from: req.user.email,
        to: email,
        subject: subject,
        html: Mustache.render(template.content, fields)
      })
      .then((mailRes) => {
        console.log(mailRes)
      })
      .catch(console.error)
  })
  res.end('Request successfully submitted')
})

module.exports = router
