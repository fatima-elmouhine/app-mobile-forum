
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const UserQcm = sequelize.define('UserQcm', {
  // Model attributes are defined here
  text_response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text_structure: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_qcm: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  // Other model options go here
});
}

// console.log(Qcm === sequelize.models.Qcm);s
