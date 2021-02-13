const express = require('express')
const nodemailer = require('nodemailer')
const sanitize = require('sanitize-html')

const Mustache = require('mustache')

const ensureAuth = require('../middleware/ensureAuth')

const User = require('../db/models/User')
const Template = require('../db/models/Template')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { user: req.user })
})

router.get('/templates', ensureAuth, async (req, res) => {
  const templates = await req.user.getTemplates()
  res.render('templates', { templates })
})

router.get('/templates/:uuid', ensureAuth, async (req, res, next) => {
  const template = await Template.findOne({ where: { id: req.params.uuid } })

  if (!template) next()

  const owner = await User.findByPk(template.user_id)

  if (!owner.equals(req.user)) next()

  res.json(await template.toJSON())
})

router.post('/templates', ensureAuth, async (req, res) => {
  // TODO: Serverside engine checks
  let { content, engine, name } = req.body

  content = sanitize(content)

  req.user.addTemplate(
    await Template.create({
      name,
      content,
      engine
    })
  )

  console.log(Mustache.render(content, { name: "John" }))

  res.redirect('/templates')
})

router.get('/send', ensureAuth, (req, res) => {
  res.render('send', { templates: req.user.getTemplates() })
})

router.post('/send', ensureAuth, (req, res) => {
  const { to, files, subject, body } = req.body

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

router.get('/login', (req, res) => {
  res.redirect('/auth/google')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.end('Logged out successfully!')
})

module.exports = router
