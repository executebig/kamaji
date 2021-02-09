const { DataTypes, Model } = require('sequelize')
const sequelize = require('../')

const Email = require('./Email')
const Template = require('./Template')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
  { sequelize, tableName: 'users' }
)

User.hasMany(Template)
User.hasMany(Email)


module.exports = User