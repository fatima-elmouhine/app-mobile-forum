const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    id_course: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    link_course: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_theme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'themes',
        key: 'id_theme'
      }
    }
  }, {
    sequelize,
    tableName: 'courses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_course" },
        ]
      },
      {
        name: "FK_courses_id_theme_themes",
        using: "BTREE",
        fields: [
          { name: "id_theme" },
        ]
      },
    ]
  });
};
