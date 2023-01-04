
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Qcm = sequelize.define('Qcm', {
  // Model attributes are defined here
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isGenerated: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  id_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  // Other model options go here
});
}

// console.log(Qcm === sequelize.models.Qcm);s
