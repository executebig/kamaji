const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../')
const User = require('./User')

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    engine: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  },
  { sequelize, underscored: true }
)

module.exports = Template
