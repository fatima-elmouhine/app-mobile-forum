
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Message = sequelize.define('Message', {
  // Model attributes are defined here
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_topic: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  id_user: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
}