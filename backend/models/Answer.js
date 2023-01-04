
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Answer = sequelize.define('Answer', {
  // Model attributes are defined here
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isCorrect_answer: {
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
}