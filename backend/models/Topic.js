const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Topic = sequelize.define('Topic', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  // Other model options go here
});
}