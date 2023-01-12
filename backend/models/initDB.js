const { Sequelize } = require('sequelize');
const { association } = require('./association');
const { hashPassword } = require('../Tools/hashDehashTools');

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
 
sequelize.sync({force: true}).then(async () => {
    const Admin = await sequelize.models.User.create({firstName: 'admin', lastName: 'admin', email:'admin@admin.com', password:hashPassword('admin'), createdAt: new Date(), updatedAt: new Date(), role:{role : ["ROLE_ADMIN","ROLE_STUDENT"] }})
    const User = await sequelize.models.User.create({firstName: 'user', lastName: 'user', email:'user@user.com', password:hashPassword('user'), createdAt: new Date(), updatedAt: new Date(), role:{role:["ROLE_TUTOR"]}})
    const User2 = await sequelize.models.User.create({firstName: 'user2', lastName: 'user2', email:'user2@user2.com', password:hashPassword('user2'), createdAt: new Date(), updatedAt: new Date(), role:{role:['ROLE_STUDENT']}})
    const Topic1 = await sequelize.models.Topic.create({title: 'topic1', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: Admin.id, id_theme: Theme1.id})
    const Topic2 = await sequelize.models.Topic.create({title: 'topic2', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User.id, id_theme: Theme2.id})
    const Topic3 = await sequelize.models.Topic.create({title: 'topic3', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User2.id, id_theme: Theme1.id})
    const Topic4 = await sequelize.models.Topic.create({title: 'topic4', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User2.id, id_theme: Theme1.id})
    const Topic5 = await sequelize.models.Topic.create({title: 'topic5', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User2.id, id_theme: Theme1.id})
    const Message1 = await sequelize.models.Message.create({text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: Admin.id, id_topic: Topic1.id})
    const Message2 = await sequelize.models.Message.create({text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User.id, id_topic: Topic2.id})
    const Message3 = await sequelize.models.Message.create({text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User2.id, id_topic: Topic3.id})
    const Message4 = await sequelize.models.Message.create({text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User.id, id_topic: Topic1.id})
    const Message5 = await sequelize.models.Message.create({text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_user: User2.id, id_topic: Topic1.id})  
    const Theme1 = await sequelize.models.Theme.create({title: 'theme1',description:'Ceci est la description du theme 1', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const Theme2 = await sequelize.models.Theme.create({title: 'theme2',description:'Ceci est la description du theme 2', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const Theme3 = await sequelize.models.Theme.create({title: 'theme3',description:'Ceci est la description du theme 3', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const Type1 = await sequelize.models.Type.create({type_name: 'type1',description:'Ceci est la description du type 1', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const Type2 = await sequelize.models.Type.create({type_name: 'type2',description:'Ceci est la description du type 2', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const Type3 = await sequelize.models.Type.create({type_name: 'type3',description:'Ceci est la description du type 3', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12))})
    const QCM = await sequelize.models.Qcm.create({title: 'qcm1',description:'Ceci est la description du qcm 1', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), isGenerated: false, id_user: Admin.id, id_type: Type1.id})
    for (let i = 1; i < 21; i++) {
        let question = await sequelize.models.Question.create({text: 'Ceci est la question' + i + ' ?', createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), id_theme: Theme1.id})
        await sequelize.models.QcmQuestion.create({QcmId: QCM.id, QuestionId: question.id})
        for (let j = 1; j < 6; j++) {
            if (j == 1) {
                let answer = await sequelize.models.Answer.create({text: 'Ceci est la réponse' + j + ' juste a la question ' + i, createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), isCorrect_answer: true})
                sequelize.models.QuestionAnswered.create({QuestionId: question.id, AnswerId: answer.id})
            }
            else {
                let answer = await sequelize.models.Answer.create({text: 'Ceci est la réponse' + j + ' fausse a la question ' + i, createdAt: new Date(new Date() - Math.random()*(1e+12)), updatedAt: new Date(new Date() - Math.random()*(1e+12)), isCorrect_answer: false})
                sequelize.models.QuestionAnswered.create({QuestionId: question.id, AnswerId: answer.id})
            }
        }
    }
    const Course1 = await sequelize.models.Course.create({link: 'https://www.tutorialspoint.com/react_native/react_native_tutorial.pdf', title:"Chapitre 1 - La mitochondrie",id_theme: Theme1.id})
    const Course2 = await sequelize.models.Course.create({link: "https://pepa.holla.cz/wp-content/uploads/2016/12/Learning-React-Native.pdf", title:"Chapitre 1 - Les os",id_theme: Theme2.id})
})



  

