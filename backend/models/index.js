const { Sequelize } = require('sequelize');
const { association } = require('./association');

const sequelize = new Sequelize('mysql://root:root@localhost:3306/medenpharmakine');

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

 sequelize.drop().then(() => {
    console.log('All tables were dropped successfully');
    sequelize.sync({force: true})
  }).catch(err => {
    console.error('Unable to drop all tables', err);
  });


