const express = require('express')
const router = express.Router()

router.use('/templates', require('./templates'))
router.use('/send', require('./send'))

module.exports = router
