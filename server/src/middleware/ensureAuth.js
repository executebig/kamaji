module.exports = (req, res, next) => {
  if (!req.user) {
    req.session.next = req.originalUrl
    res.redirect('/auth')
    return
  }

  next()
}