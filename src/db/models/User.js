const { DataTypes, Model } = require('sequelize')
const sequelize = require('../')

const Email = require('./Email')
const Template = require('./Template')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false
    }
  },
  { sequelize, underscored: true }
)

User.hasMany(Template)
User.hasMany(Email)


module.exports = User