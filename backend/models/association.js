function association(sequelize){
    // const {User, Qcm, } = sequelize.models;
    const {User, Qcm,UserQcm, Topic, Message, Question, Answer, Result, Theme, Type, Course} = sequelize.models;
    // User.belongsToMany(Qcm, { through: 'UserQcm' });
    User.hasMany(Message, {foreignKey: 'id_user'});
    Topic.hasMany(Message, {foreignKey: 'id_topic'});
    Message.belongsTo(Topic, {foreignKey: 'id_topic'});
    Message.belongsTo(User, {foreignKey: 'id_user'});
    User.hasMany(UserQcm, {foreignKey: 'id_user'});
    Qcm.hasMany(UserQcm, {foreignKey: 'id_qcm'});
    Result.belongsTo(UserQcm, {foreignKey: 'id_user_qcm'});
    Result.belongsTo(Question, {foreignKey: 'id_question'});
    User.hasMany(Qcm, {foreignKey: 'id_user'});
    User.hasMany(Topic, {foreignKey: 'id_user'});
    Theme.hasMany(Question, {foreignKey: 'id_theme'});
    Theme.hasMany(Course, {foreignKey: 'id_theme'});
    Course.belongsTo(Theme, {foreignKey: 'id_theme'})
    Type.hasMany(Qcm, {foreignKey: 'id_type'});
    Qcm.belongsTo(Type, {foreignKey: 'id_type'});
    Topic.belongsTo(Theme, {foreignKey: 'id_theme'});
    Theme.hasMany(Topic, {foreignKey: 'id_theme'});
    Topic.belongsTo(User, {foreignKey: 'id_user'} )


    Answer.belongsToMany(Question, { through: 'QuestionAnswered' });
    Question.belongsToMany(Answer, { through: 'QuestionAnswered' });
    Qcm.belongsToMany(Question, { through: 'QcmQuestion' });
    Question.belongsToMany(Qcm, { through: 'QcmQuestion' });
    // Qcm.hasMany(Question);
    // Question.belongsTo(Qcm);
    // Question.hasMany(Qcm);
    // Qcm.belongsTo(Question);


    

}

module.exports = {association};