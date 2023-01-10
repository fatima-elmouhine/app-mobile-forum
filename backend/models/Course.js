
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Course = sequelize.define('Course', {
  // Model attributes are defined here
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  id_theme: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
}