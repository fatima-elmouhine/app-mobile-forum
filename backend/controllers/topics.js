const sequelize  = require('../models/index');
const {Topic} = sequelize.models;


async function getTopics(req, res)
{
    var topicsReq =  await Topic.findAll().then(topicArray => {
        return topicArray;
    });

    res.json(topicsReq);
}

async function getTopic (req, res) 
{
    
    try 
    {
        const topicReq = await Topic.findOne({ where: {id:req.params.id }})
        .then(topic => {
            return topic;
        });

        console.log(topicReq);

        if(topicReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(topicReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postTopic (req, res) 
{
    if(!req.body.title || !req.body.id_user)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newTopic = {            
            title: req.body.title,
            id_user: req.body.id_user
        }
    }

    await Topic.create(newTopic)
    .then(topic => {
        res.status(201).json(topic)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateTopic (req, res) 
{
    try 
    {
        const topic = await Topic.findOne({ where: {id: req.params.id }})
        .then(topic => {
            return topic;
        })

        if(topic == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.title || !req.body.id_user || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Topic.update(
                { 
                    id: req.body.id,
                    title: req.body.title,
                    id_user: req.body.id_user
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(topic => {
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

async function deleteTopic (req, res) 
{
    try 
    {
       const topic = await Topic.findOne({ where: {id: req.params.id }})
        .then(topic => {
            return topic;
        })

        if(topic != null) 
        {
            await Topic.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(topic => {
                res.status(200).send('La suppression a été effectuée')
                // return topic;
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
    getTopics,
    postTopic,
    getTopic,
    updateTopic,
    deleteTopic
}