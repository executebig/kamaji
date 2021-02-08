const { DataTypes, Model } = require('sequelize')
const sequelize = require('../db')

const User = require('./User')
const Template = require('./Template')

class Email extends Model {}

Email.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    template: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: Template,
        key: id
      }
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: id
      }
    },
  },
  { sequelize, tableName: 'emails' }
).sync()


module.exports = Email