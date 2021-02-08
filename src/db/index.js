const { Sequelize } = require('sequelize')

const db = new Sequelize('postgres://postgres:postgres@localhost:5432/')

db.authenticate()
  .then(() => console.log('Connected to DB successfully'))
  .catch(() => console.error('Unable to connect to DB'))

module.exports = db