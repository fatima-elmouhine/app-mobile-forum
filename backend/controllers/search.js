const sequelize  = require('../models/index');
const { Op } = require("sequelize");

async function getSearchForum(req, res)
{
    const {search, item, order} = req.query;
    const searchItem = item?.split(',');
    if (!search || search?.length < 3 ) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Topics = searchItem?.includes('Topics') || searchItem === undefined ? await getSearch(sequelize.models.Topic, search, [{model : sequelize.models.User}, {model : sequelize.models.Theme}, {model : sequelize.models.Message}], 'title', order) : null;
    const Themes = searchItem?.includes('Themes') || searchItem === undefined ? await getSearch(sequelize.models.Theme, search, {model : sequelize.models.Topic, separate: true}, 'title', order) : null;
    const Messages = searchItem?.includes('Messages') || searchItem === undefined ? await getSearch(sequelize.models.Message, search, {model : sequelize.models.Topic, include: sequelize.models.User, include : sequelize.models.Theme},'text', order) : null;
    return res.json({Topics, Themes, Messages});
}

async function getSearchCourses (req,res) 
{
    const {search, order} = req.query;
    if (search?.length < 3 || !search ) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Courses = await getSearch(sequelize.models.Course, search, {model : sequelize.models.Theme}, 'title', order);
    return res.json({Courses});
}

async function getSearch (model, search, include = null, field, order) {
    order = order?.split(':') ?? ['createdAt', 'ASC'];
    try {
        return await model.findAndCountAll({
            where: {
                [field] : {
                    [Op.like]: `%${search}%`
                }
            },
            include: include, order: [order]
        });            
    } catch (error) {
        return error;
    }
}

module.exports = {getSearchForum, getSearchCourses}




