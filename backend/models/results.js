const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('results', {
    id_result: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    result_result: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    answers_qcm_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id_question'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_user_qcm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users_qcms',
        key: 'id_user_qcm'
      }
    }
  }, {
    sequelize,
    tableName: 'results',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_result" },
        ]
      },
      {
        name: "FK_results_id_question_questions",
        using: "BTREE",
        fields: [
          { name: "id_question" },
        ]
      },
      {
        name: "FK_results_id_user_users",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "FK_results_id_user_qcm_users_qcms",
        using: "BTREE",
        fields: [
          { name: "id_user_qcm" },
        ]
      },
    ]
  });
};
