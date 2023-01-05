const sequelize  = require('../models/index');
const {Topic, Message} = sequelize.models;


async function getTopics(req, res)
{
    var topicsReq =  await Topic.findAll().then(topicArray => {
        return topicArray;
    });

    res.status(200).json(topicsReq);
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
            res.status(404).send('Ce topic n\'existe pas');
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
    // TODO: Recuperer l'id de l'utilisateur connecté et l'ajouter à la requete depuis le Token JWT
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

        await Topic.create(newTopic)
        .then(topic => {
            res.status(201).json(topic)
        })
        .catch(err => {
            res.status(406).send('Une erreur est survenue');
    
        });
    }


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
            res.status(404).send('Ce topic n\'existe pas');
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

async function getMessagesTopic (req, res){
    try 
    {
        const topic = await Topic.findOne({ where: {id: req.params.id }})
        .then(topic => {
            return topic;
        }
        )

        if(topic != null)
        {
            
             await Message.findAll({ where: {id_topic: req.params.id }})
            .then(messages => {
                if(messages.length == 0)
                {
                    res.status(404).send('Aucun message n\'a été trouvé');
                }else{
                    res.status(200).send(messages);
                }
            })
            
        }else
        {
            res.status(404).send('Ce topic n\'existe pas');
        }

    }
    catch (error)
    {
        res.status(404).send('Ce topic n\'existe pas');
    }

}


module.exports = {
    getTopics,
    postTopic,
    getTopic,
    updateTopic,
    deleteTopic,
    getMessagesTopic
}