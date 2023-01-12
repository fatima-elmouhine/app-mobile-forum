const sequelize  = require('../models/index');
const { Op } = require("sequelize");

async function getSearchForum(req, res)
{
    const {search} = req.query;
    if (search.length < 3) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Topics = await sequelize.models.Theme.findAndCountAll({
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        },
        include: {model : sequelize.models.Topic, include: sequelize.models.User}
    });
    const Themes = await sequelize.models.Theme.findAndCountAll({
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        },
        include: {model : sequelize.models.Topic}
    });
    const Messages = await sequelize.models.Message.findAndCountAll({
        where: {
            text: {
                [Op.like]: `%${search}%`
            }
        },
        include: {model : sequelize.models.Topic, include: sequelize.models.User}
    });
    res.json({Topics, Themes, Messages});
}

async function getSearchCourses (req,res) 
{
    const {search} = req.query;
    if (search.length < 3) return res.status(400).send('Votre recherche doit contenir au moins 3 caractères');
    const Courses = await sequelize.models.Course.findAndCountAll({
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        },
        include: {model : sequelize.models.Theme}
    });
    res.json({Courses});
}

module.exports = {getSearchForum, getSearchCourses}




