const sequelize  = require('../models/index');
const {Topic, Message, User,Theme} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');



async function getTopics(req, res)
{
    try {
        const topics = await genericGetAll(Topic, req);
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getTopic (req, res) 
{
    try 
    {
        const topic = await genericGetOne(Topic, req);
        if (topic === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(topic);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function postTopic (req, res) 
{
    if(!req.body.data.title)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newTopic = {            
            title: req.body.data.title,
            id_theme: req.body.data.id_theme,
            id_user: req.user.id
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
        const topic = await Topic.findOne({ where: {id: req.body.topicID }})
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
                    id_user: req.body.id_user,
                    id_theme: req.body.id_theme
                    
                }, 
                {
                where: 
                {
                    id: req.body.topicID
                }})
                .then(topic => {
                    console.log(topic);
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
       const topic = await Topic.findOne({ where: {id: req.body.id }})
        .then(topic => {
            return topic;
        })

        if(topic != null) 
        {
            await Topic.destroy({
                where: {
                id: req.body.id
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
        const msg =  await Message.findAll( { where: {id_topic: req.params.id }, include: [Topic, User]})
        if(msg.length == 0)
        {
            res.status(404).send('Aucun message n\'a été trouvé');
        }else{
            res.status(200).send(msg);
        }

    }
    catch (error)
    {
        res.status(404).send('Une erreur est survenue');
    }

}

async function postMessageTopic (req, res){


    // TODO : Recuperer l'id de l'utilisateur connecté et l'ajouter à la requete depuis le Token JWT
    if(!req.body.text || !req.body.id_user || !req.body.id_topic)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newMessage = {            
            text: req.body.text,
            id_user: req.body.id_user,
            id_topic: req.body.id_topic
        }

        await Message.create(newMessage)
        .then(message => {
            res.status(201).json('Votre message a bien été envoyé')
        })
        .catch(err => {
            res.status(406).send('Une erreur est survenue');
    
        });
    }
}


module.exports = {
    getTopics,
    postTopic,
    getTopic,
    updateTopic,
    deleteTopic,
    getMessagesTopic,
    postMessageTopic
}