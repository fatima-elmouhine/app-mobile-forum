const sequelize  = require('../models/index');

async function genericGetAll(model, req) {
    
    const include = req.query?.include?.split(',');
        const limit = req.query?.limit ?? 100;
        const offset = req.query?.offset ?? 0;
        const order = req.query.order?.split(':') ?? ['createdAt', 'ASC'];
        const options = [];
        include?.map((name) => {
            let option = name.split(':');
            options.push({ 'model': sequelize.models[option[0]], required : option[1] === 'true' ? true : false, limit: parseInt(option[2])})
        }); 
        return await model.findAndCountAll({ include: options, limit: parseInt(limit), offset: parseInt(offset), order: [order] });

}

module.exports = {genericGetAll};