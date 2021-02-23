module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401)
    res.json({ error: 'Unauthorized' })
    return
  }

  next()
}
