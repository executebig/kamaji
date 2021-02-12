const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../')

const User = require('./User')
const Template = require('./Template')

class Email extends Model {}

Email.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    to: {
      type: DataTypes.STRING(320)
    }
  },
  { sequelize, underscored: true }
)

// Email.belongsTo(User)
// Email.belongsTo(Template)


module.exports = Email