var DataTypes = require("sequelize").DataTypes;
var _answers = require("./answers");
var _courses = require("./courses");
var _messages = require("./messages");
var _qcms = require("./qcms");
var _qcms_questions = require("./qcms_questions");
var _questions = require("./questions");
var _questions_answers = require("./questions_answers");
var _results = require("./results");
var _themes = require("./themes");
var _topics = require("./topics");
var _types = require("./types");
var _users = require("./users");
var _users_qcms = require("./users_qcms");

function initModels(sequelize) {
  var answers = _answers(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var qcms = _qcms(sequelize, DataTypes);
  var qcms_questions = _qcms_questions(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var questions_answers = _questions_answers(sequelize, DataTypes);
  var results = _results(sequelize, DataTypes);
  var themes = _themes(sequelize, DataTypes);
  var topics = _topics(sequelize, DataTypes);
  var types = _types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_qcms = _users_qcms(sequelize, DataTypes);

  questions_answers.belongsTo(answers, { as: "id_answer_answer", foreignKey: "id_answer"});
  answers.hasMany(questions_answers, { as: "questions_answers", foreignKey: "id_answer"});
  qcms_questions.belongsTo(qcms, { as: "id_qcm_qcm", foreignKey: "id_qcm"});
  qcms.hasMany(qcms_questions, { as: "qcms_questions", foreignKey: "id_qcm"});
  users_qcms.belongsTo(qcms, { as: "id_qcm_qcm", foreignKey: "id_qcm"});
  qcms.hasMany(users_qcms, { as: "users_qcms", foreignKey: "id_qcm"});
  qcms_questions.belongsTo(questions, { as: "id_question_question", foreignKey: "id_question"});
  questions.hasMany(qcms_questions, { as: "qcms_questions", foreignKey: "id_question"});
  questions_answers.belongsTo(questions, { as: "id_question_question", foreignKey: "id_question"});
  questions.hasMany(questions_answers, { as: "questions_answers", foreignKey: "id_question"});
  results.belongsTo(questions, { as: "id_question_question", foreignKey: "id_question"});
  questions.hasMany(results, { as: "results", foreignKey: "id_question"});
  courses.belongsTo(themes, { as: "id_theme_theme", foreignKey: "id_theme"});
  themes.hasMany(courses, { as: "courses", foreignKey: "id_theme"});
  questions.belongsTo(themes, { as: "id_theme_theme", foreignKey: "id_theme"});
  themes.hasMany(questions, { as: "questions", foreignKey: "id_theme"});
  messages.belongsTo(topics, { as: "id_topic_topic", foreignKey: "id_topic"});
  topics.hasMany(messages, { as: "messages", foreignKey: "id_topic"});
  qcms.belongsTo(types, { as: "id_type_type", foreignKey: "id_type"});
  types.hasMany(qcms, { as: "qcms", foreignKey: "id_type"});
  messages.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(messages, { as: "messages", foreignKey: "id_user"});
  qcms.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(qcms, { as: "qcms", foreignKey: "id_user"});
  results.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(results, { as: "results", foreignKey: "id_user"});
  topics.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(topics, { as: "topics", foreignKey: "id_user"});
  users_qcms.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(users_qcms, { as: "users_qcms", foreignKey: "id_user"});
  results.belongsTo(users_qcms, { as: "id_user_qcm_users_qcm", foreignKey: "id_user_qcm"});
  users_qcms.hasMany(results, { as: "results", foreignKey: "id_user_qcm"});

  return {
    answers,
    courses,
    messages,
    qcms,
    qcms_questions,
    questions,
    questions_answers,
    results,
    themes,
    topics,
    types,
    users,
    users_qcms,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
