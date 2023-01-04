// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Qcm extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.belongsToMany(Model.User, { through: 'UserQcm' });

//     }
//   }
//   Qcm.init({
//     title: DataTypes.STRING,
//     is_generated: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Qcm',
//   });
//   return Qcm;
// };
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

module.exports = (sequelize) => {
const Qcm = sequelize.define('Qcm', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});
}

// console.log(Qcm === sequelize.models.Qcm);s
