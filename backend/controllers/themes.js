const sequelize  = require('../models/index');
const {Theme, Topic, Course} = sequelize.models;


async function getThemes(req, res)
{   
    try {
        const Themes = await Theme.findAll(
            req.query.include ? 
            {
                include: {
                    model: eval(req.query.include),
                    limit: req.query.limitInclude ? eval(req.query.limitInclude) : 0,
                    order: [['createdAt', 'DESC']],
                },
                limit: req.query.limit ? eval(req.query.limit) : 100,
            } : {
                limit: req.query.limit ? eval(req.query.limit) : 100,
            },
        )
        res.status(200).json(Themes);
    } catch (error) {
        res.status(500).json(error.message);
    }

}


async function getTheme (req, res) 
{
    try 
    {
        const theme = await Theme.findOne({ where: {id:req.params.id }});
        if (!theme) throw new Error('Aucun thème trouvé');
        res.status(200).json(theme);
    } 
    catch (error) 
    {
        res.status(500).send(error.message);
    }
}

async function postTheme (req, res) 
{
    try 
    {
        if(!req.body.title || !req.body.description)
        {
            res.status(406).send('Les champs doivent être tous remplis');
        }
        else
        {
            const newTheme = {
                title: req.body.title,
                description: req.body.description
            }
            const theme = await Theme.create(newTheme);
            res.status(200).json(theme);
        }
    } 
    catch (error) 
    {
        res.status(500).json(error.message)
    }
}

async function updateTheme (req, res) 
{
    try {
        const theme = await Theme.update({
            title: req.body.title,
            description: req.body.description
        }, {where: {id: req.body.id}});
        if (!theme[0]) throw new Error('Aucun thème trouvé');
        const newTheme = await Theme.findOne({ where: {id: req.body.id }});
        res.status(200).json(newTheme);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function deleteTheme (req, res) 
{
    try {
        const theme = await Theme.destroy({where: {id: req.body.id}});
        if (!theme) throw new Error('Aucun thème trouvé');
        res.status(200).json({"message": "Le thème "+ req.body.id +" a bien été supprimé"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    getThemes,
    postTheme,
    getTheme,
    updateTheme,
    deleteTheme
}