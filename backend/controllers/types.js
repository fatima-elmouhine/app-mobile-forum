const sequelize  = require('../models/index');
const {Types} = sequelize.models;


async function getTypess(req, res)
{
    var typessReq =  await Types.findAll().then(typesArray => {
        return typesArray;
    });

    res.json(typessReq);
}

async function getTypes (req, res) 
{
    
    try 
    {
        const typesReq = await Types.findOne({ where: {id:req.params.id }})
        .then(types => {
            return types;
        });

        console.log(typesReq);

        if(typesReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(typesReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postTypes (req, res) 
{
    const newTypes = {            
        id: req.body.id,
        type_name: req.body.type_name
    }

    await Types.create(newTypes)
    .then(types => {
        res.status(201).json(types)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateTypes (req, res) 
{
    try 
    {
        const types = await Types.findOne({ where: {id: req.params.id }})
        .then(types => {
            return types;
        })

        if(types == null) 
        {
            res.status(404).send('La réponse n\'existe pas');
        }
        else
        {

            await Types.update(
                { 
                    id: req.body.id,
                    id: req.body.id,
                    type_name: req.body.type_name
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(types => {
                    res.status(201).send('La modification a été effectuée')
                })
                .catch(err => {
                    res.status(406).send('Error');
                })
        }
    } 
    catch (error) 
    {
        res.status(406).send('Error');

    }
    
}

async function deleteTypes (req, res) 
{
    try 
    {
       const types = await Types.findOne({ where: {id: req.params.id }})
        .then(types => {
            return types;
        })

        if(types != null) 
        {
            await Types.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(types => {
                res.status(200).send('La suppression a été effectuée')
                // return types;
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
    getTypess,
    postTypes,
    getTypes,
    updateTypes,
    deleteTypes
}