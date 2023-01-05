const sequelize  = require('../models/index');
const {Theme} = sequelize.models;


async function getThemes(req, res)
{
    var themesReq =  await Theme.findAll().then(themeArray => {
        return themeArray;
    });

    res.json(themesReq);
}

async function getTheme (req, res) 
{
    
    try 
    {
        const themeReq = await Theme.findOne({ where: {id:req.params.id }})
        .then(theme => {
            return theme;
        });

        console.log(themeReq);

        if(themeReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(themeReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postTheme (req, res) 
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
    }

    await Theme.create(newTheme)
    .then(theme => {
        res.status(201).json(theme)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateTheme (req, res) 
{
    try 
    {
        const theme = await Theme.findOne({ where: {id: req.params.id }})
        .then(theme => {
            return theme;
        })

        if(theme == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.title || !req.body.description || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Theme.update(
                { 
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(theme => {
                    res.status(201).send('La modification a été effectuée')
                })
                .catch(err => {
                    res.status(406).send('Error');
                })
            }
        }
    } 
    catch (error) 
    {
        res.status(406).send('Error');

    }
    
}

async function deleteTheme (req, res) 
{
    try 
    {
       const theme = await Theme.findOne({ where: {id: req.params.id }})
        .then(theme => {
            return theme;
        })

        if(theme != null) 
        {
            await Theme.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(theme => {
                res.status(200).send('La suppression a été effectuée')
                // return theme;
            })
            .catch(err => {
                res.status(404).send('La suppression n\'a pas aboutie!');
            })


        }
        else
        {
            res.status(404).send('Ce que vous tentez de supprimer n\'a pas été trouvé');
        }
    } 
    catch (error) 
    {
        res.status(500).send('Erreur lors de la suppression');
    }
    
}


module.exports = {
    getThemes,
    postTheme,
    getTheme,
    updateTheme,
    deleteTheme
}