const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions_answers', {
    id_question_answer: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id_question'
      }
    },
    id_answer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id_answer'
      }
    }
  }, {
    sequelize,
    tableName: 'questions_answers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_question_answer" },
        ]
      },
      {
        name: "FK_questions_answers_id_question_questions",
        using: "BTREE",
        fields: [
          { name: "id_question" },
        ]
      },
      {
        name: "FK_questions_answers_id_answer_answers",
        using: "BTREE",
        fields: [
          { name: "id_answer" },
        ]
      },
    ]
  });
};
