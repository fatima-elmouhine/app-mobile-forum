
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Type = sequelize.define('Type', {
  // Model attributes are defined here
  type_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});
}