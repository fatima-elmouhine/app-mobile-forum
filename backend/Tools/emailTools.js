const users = require('../models/users');

function isValidEmailForm(email){

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(pattern)

}

async function emailExist(email){
        
    const users = await users.findAll();;
    return users.findOne({ where: {id: email }}) ? true : false;

}

module.exports = { isValidEmailForm, emailExist }