const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../')

class Email extends Model {}

Email.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    to: {
      type: DataTypes.STRING(320),
      allowNull: false
    },
    fields: {
      type: DataTypes.JSONB
    }
  },
  { sequelize, underscored: true }
)

module.exports = Email
