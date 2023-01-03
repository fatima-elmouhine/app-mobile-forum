const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    firstname_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastname_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password_user: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
