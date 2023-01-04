
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Result = sequelize.define('Result', {
  // Model attributes are defined here
  result: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  id_question: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  id_user_qcm: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
    }

}, {
  // Other model options go here
});
}