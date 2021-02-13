
const express = require('express')
const sanitize = require('sanitize-html')

const Mustache = require('mustache')

const ensureAuth = require('../middleware/ensureAuth')

const User = require('../db/models/User')
const Template = require('../db/models/Template')

const router = express.Router()

router.get('/', ensureAuth, async (req, res) => {
  const templates = await req.user.getTemplates()
  res.render('templates', { templates })
})

router.get('/:uuid', ensureAuth, async (req, res, next) => {
  const template = await Template.findOne({ where: { id: req.params.uuid } })

  if (!template) next()

  const owner = await User.findByPk(template.user_id)

  if (!owner.equals(req.user)) next()

  res.json(await template.toJSON())
})

router.post('/', ensureAuth, async (req, res) => {
  // TODO: Serverside engine checks
  // TODO: Sanitization for mustache render
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

module.exports = router
