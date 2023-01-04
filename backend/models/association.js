function association(sequelize){
    const {User, Qcm} = sequelize.models;
    User.belongsToMany(Qcm, { through: 'UserQcm' });
}

module.exports = {association};