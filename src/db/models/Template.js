const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../')

const User = require('./User')
const Email = require('./Email')

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    templateEngine: DataTypes.STRING(32)
  },
  { sequelize, tableName: 'templates' }
)

module.exports = Template
