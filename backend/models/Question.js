
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Question = sequelize.define('Question', {
  // Model attributes are defined here
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_theme: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
}