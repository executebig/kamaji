const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../')

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
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
