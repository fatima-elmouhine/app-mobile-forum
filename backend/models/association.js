function association(sequelize){
    // const {User, Qcm, } = sequelize.models;
    const {User, Qcm,UserQcm, Topic, Message, Question, Answer, Result, Theme, Type, Course} = sequelize.models;
    // User.belongsToMany(Qcm, { through: 'UserQcm' });
    User.hasMany(Message, {foreignKey: 'id_user'});
    Topic.hasMany(Message, {foreignKey: 'id_topic'});
    User.hasMany(UserQcm, {foreignKey: 'id_user'});
    Qcm.hasMany(UserQcm, {foreignKey: 'id_qcm'});
    Result.belongsTo(UserQcm, {foreignKey: 'id_user_qcm'});
    Result.belongsTo(Question, {foreignKey: 'id_question'});
    User.hasMany(Qcm, {foreignKey: 'id_user'});
    User.hasMany(Topic, {foreignKey: 'id_user'});
    Theme.hasMany(Question, {foreignKey: 'id_theme'});
    Theme.hasMany(Course, {foreignKey: 'id_theme'});
    Type.hasOne(Qcm, {foreignKey: 'id_type'});

    Answer.belongsToMany(Question, { through: 'QuestionAnswered' });
    

}

module.exports = {association};