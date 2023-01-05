const { Sequelize } = require('sequelize');
const { association } = require('./association');

const { MYSQL_LOCAL_PORT, MYSQL_ROOT, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE } = process.env;
const sequelize = new Sequelize(`mysql://${MYSQL_ROOT}:${MYSQL_ROOT_PASSWORD}@localhost:${MYSQL_LOCAL_PORT}/${MYSQL_DATABASE}`);

const modelDefiners = [
  require('./User'),
  require('./Qcm'),
  require('./UserQcm'),
  require('./Topic'),
  require('./Message'),
  require('./Question'),
  require('./Answer'),
  require('./Result'),
  require('./Theme'),
  require('./Type'),
  require('./Course'),

];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}



association(sequelize);

module.exports = sequelize;


