const sequelize  = require('../models/index');
const {Theme, Qcm, Question} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');
const fs = require("fs");

async function getThemes(req, res)
{   
    try {
        const themes = await genericGetAll(Theme, req);
        res.status(200).json(themes);    
    } catch (error) {
        res.status(500).send
    }
}


async function getTheme (req, res) 
{
    try 
    {
        const theme = await genericGetOne(Theme, req);
        if (theme === null) return res.status(200).json('La réponse n\'existe pas');
        res.status(200).json(theme);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function postTheme (req, res) 
{
    try 
    {
        if(!req.body.title || !req.body.description /*|| !req.file.imageTheme*/)
        {
            res.status(406).send('Les champs doivent être tous remplis');
        }
        else
        {
            const newTheme = {
                title: req.body.title,
                description: req.body.description,
                // imageTheme: req.file.imageTheme
            }
            const theme = await Theme.create(newTheme);
            return
            if (theme.imageTheme) {
                fs.unlink(`./public/imageTheme/` + theme.imageTheme, (err) => {
                    if (err) {
                        console.log("err", err);
                    }
                });
            }
            const imageTheme = await Theme.update(
                { imageTheme: req.file.imageTheme },
                { where: { id: theme.id } }
            );
            res.status(200).send(req.file);
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
            description: req.body.description,
        }, {where: {id: req.body.id}});
        if (!theme[0]) throw new Error('Aucun thème trouvé');
        const newTheme = await Theme.findOne({ where: {id: req.body.id }});
        res.status(200).json(newTheme);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function uploadTheme(req, res) {
    console.log("req.file", req.file);
    if (!req.file) {
      return res.status(400).send({ error: "Aucune image téléchargée" });
    }
    const theme = await Theme.findByPk(req.body.id, { attributes: ["imageTheme"] });
    if (theme.imageTheme) {
      fs.unlink(`./public/imageTheme/` + theme.imageTheme, (err) => {
        if (err) {
          console.log("err", err);
        }
      });
    }
    const imageTheme = await Theme.update(
      { imageTheme: req.file.filename },
      { where: { id: req.body.id } }
    );
    res.status(200).send(req.file);
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

async function getQcms (req,res) 
{
    try {
        const Qcms = await Qcm.findAll({
            where: {isGenerated: false},
            include: {model: Question, where: {id_theme: req.params.id}}
        });
        res.status(200).json(Qcms);        
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getThemes,
    postTheme,
    getTheme,
    updateTheme,
    deleteTheme,
    uploadTheme,
    getQcms
}