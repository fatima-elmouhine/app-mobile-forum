const sequelize  = require('../models/index');
const {Type} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');



async function getTypes(req, res)
{
    try {
        const types = await genericGetAll(Type, req);
        res.append('X-Total-Count',types.count);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');
        res.status(200).json(types.rows);    
    } catch (error) {
        res.status(500).send
    }
}

async function getType (req, res) 
{
    try {
        const type = await genericGetOne(Type, req);
        if (type === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(type);
    } catch (error) {
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