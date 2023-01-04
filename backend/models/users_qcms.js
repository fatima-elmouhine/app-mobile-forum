const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_qcms', {
    id_user_qcm: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    structure_qcm_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    answers_qcm_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_qcm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'qcms',
        key: 'id_qcm'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'users_qcms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user_qcm" },
        ]
      },
      {
        name: "FK_users_qcms_id_qcm_qcms",
        using: "BTREE",
        fields: [
          { name: "id_qcm" },
        ]
      },
      {
        name: "id_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
