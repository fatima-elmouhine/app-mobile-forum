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
    return await model.findAll({ include: options, limit: parseInt(limit), offset: parseInt(offset), order: [order] });

}

async function genericGetOne(model,req) 
{
    try {
        const id = req.params.id;
        const include = req.query.include?.split(',');
        const order = req.query.order?.split(':') ?? null;
        const options = [];
        include?.map((name) => {
            options.push({ 'model': sequelize.models[name]})
        }); 

        const orderOptions = order ? [options[0].model, order[0], order[1]] : ['createdAt', 'ASC'] ;
        const datas = await model.findOne({ where: {id}, include: options, order: [orderOptions]});
        return datas;
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {genericGetAll, genericGetOne};