require('dotenv').config()

const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DB_URL)

// TODO: Handle DB issues
db.authenticate()
  .then(() => console.log('Connected to DB successfully'))
  .catch(err => console.log(err.stack))

db.sync()
  .then(() => console.log('Successfully synced db'))
  .catch(err => console.log(err.stack))

module.exports = db