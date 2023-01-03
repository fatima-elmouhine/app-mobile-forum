const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('qcms_questions', {
    id_qcm_question: {
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
    id_qcm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'qcms',
        key: 'id_qcm'
      }
    }
  }, {
    sequelize,
    tableName: 'qcms_questions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_qcm_question" },
        ]
      },
      {
        name: "FK_qcms_questions_id_question_questions",
        using: "BTREE",
        fields: [
          { name: "id_question" },
        ]
      },
      {
        name: "FK_qcms_questions_id_qcm_qcms",
        using: "BTREE",
        fields: [
          { name: "id_qcm" },
        ]
      },
    ]
  });
};
