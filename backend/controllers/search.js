const sequelize  = require('../models/index');
const { Op } = require("sequelize");

async function getSearchForum(req, res)
{
    const {search, item} = req.query;
    const searchItem = item?.split(',');
    if (!search || search?.length < 3 ) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Topics = searchItem?.includes('Topics') || searchItem === undefined ? await getSearch(sequelize.models.Topic, search, [{model : sequelize.models.User}, {model : sequelize.models.Theme}], 'title') : null;
    const Themes = searchItem?.includes('Themes') || searchItem === undefined ? await getSearch(sequelize.models.Theme, search, {model : sequelize.models.Topic}, 'title') : null;
    const Messages = searchItem?.includes('Messages') || searchItem === undefined ? await getSearch(sequelize.models.Message, search, {model : sequelize.models.Topic, include: sequelize.models.User, include : sequelize.models.Theme},'text') : null;
    return res.json({Topics, Themes, Messages});
}

async function getSearchCourses (req,res) 
{
    const {search} = req.query;
    if (search?.length < 3 || !search ) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Courses = await getSearch(sequelize.models.Course, search, {model : sequelize.models.Theme}, 'title');
    return res.json({Courses});
}

async function getSearch (model, search, include = null, field) {
    return await model.findAndCountAll({
        where: {
            [field] : {
                [Op.like]: `%${search}%`
            }
        },
        include: include
    });
}

module.exports = {getSearchForum, getSearchCourses}




