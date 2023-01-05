
const sequelize  = require('../models/index');
const {User} = sequelize.models;
const users = User

function isValidEmailForm(email){

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(pattern)

}

async function emailExist(email){
        
    // const users = await users.findAll();
    return users.findOne({ where: {email: email }}) ? true : false;

}

async function isUserExist(id){
        
    await users.findOne({ where: {id: id }})
    .then(user => {
        return user;
    })
}



module.exports = { isValidEmailForm, emailExist, isUserExist }