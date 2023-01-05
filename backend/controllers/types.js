const sequelize  = require('../models/index');
const {Type} = sequelize.models;



async function getTypes(req, res)
{
    var typesReq =  await Type.findAll().then(typesArray => {
    
        return typesArray;
    });

    res.json(typesReq);
}

async function getType (req, res) 
{
    
    try 
    {
        const typesReq = await Type.findOne({ where: {id:req.params.id }})
        .then(types => {
            return types;
        });

        console.log(typesReq);

        if(typesReq == null) 
        {
            // res.status(404).send('Artefact not found');
            res.status(404).send('Ce type n\'existe pas');
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
    if(!req.body.type_name)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newTypes = {            
            id: req.body.id,
            type_name: req.body.type_name
        }
        await Type.create(newTypes)
        .then(types => {
            res.status(201).json(types)
        })
        .catch(err => {
            res.status(406).send('Ce type est déjà utilisé');
    
        });
    }


}

async function updateTypes (req, res) 
{
    try 
    {
        const types = await Type.findOne({ where: {id: req.params.id }})
        .then(types => {
            return types;
        })

        if(types == null) 
        {
            res.status(404).send('Ce type n\'existe pas');
        }
        else
        {
            if( !req.body.type_name)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Type.update(
                { 
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
       const types = await Type.findOne({ where: {id: req.params.id }})
        .then(types => {
            return types;
        })

        if(types != null) 
        {
            await Type.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(types => {
                res.status(200).send('La suppression a été effectuée')
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
    getTypes,
    postTypes,
    getType,
    updateTypes,
    deleteTypes
}