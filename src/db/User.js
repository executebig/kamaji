const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
  { sequelize, tableName: 'users' }
).sync()


module.exports = User