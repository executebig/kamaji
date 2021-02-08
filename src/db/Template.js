const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../db')

const User = require('./User')

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: id
      }
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  { sequelize, tableName: 'templates' }
).sync()


module.exports = Template