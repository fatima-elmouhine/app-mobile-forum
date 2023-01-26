
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Theme = sequelize.define('Theme', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255)
    // allowNull defaults to true
  },
  imageTheme: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }

}, {
  // Other model options go here
});
}