const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', {
    id_question: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text_question: {
      type: DataTypes.TEXT,
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
    tableName: 'questions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_question" },
        ]
      },
      {
        name: "FK_questions_id_theme_themes",
        using: "BTREE",
        fields: [
          { name: "id_theme" },
        ]
      },
    ]
  });
};
