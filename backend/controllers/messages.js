const sequelize  = require('../models/index');
const {Message} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');



async function getMessages(req, res)
{
    try {
        const messages = await genericGetAll(Message, req);
        res.status(200).json(messages);    
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getMessage (req, res) 
{
    try 
    {
        const message = await genericGetOne(Message, req);
        if (message === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function postMessage (req, res) 

{
    // TODO: Recuperer l'id de l'utilisateur connecté et l'ajouter à la requete depuis le Token JWT
    try {
        if (!req.body.data.id_topic) throw new Error("Une erreur est survenue lors de la création du message");
    
        if(!req.body.data.text || !req.body.data.id_topic)
        {
           return res.status(406).send('Les champs doivent être tous remplis');
        }
        // else
        // {
            const newMessage = {            
                text: req.body.data.text,
                id_topic: req.body.data.id_topic,
                id_user: req.user.id
            }
            await Message.create(newMessage)
            .then(message => {
                console.log('Ceci est un message',message);
                if(message == null) 
                {
                    res.status(406).send('Error');
                }else{
                    res.status(201).json(message)
                }
            })
    
        // }
        
    } catch (error) {
        res.status.json(error);
        
    }


}

async function updateMessage (req, res) 
{
    try 
    {
        const message = await Message.findOne({ where: {id: req.params.id }})
        .then(message => {
            return message;
        })

        if(message == null) 
        {
            res.status(404).send('Ce message n\'existe pas');
        }
        else
        {
                await Message.update(
                { 
                    id: req.body.id,
                    text: req.body.text,
                    id_topic: req.body.id_topic,
                    id_user: req.body.id_user
                }, 
                {
                where: 
                {
                    id: req.body.id
                }})
                .then(message => {
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

async function deleteMessage (req, res) 
{
    try 
    {
       const message = await Message.findOne({ where: {id: req.body.id }})
        .then(message => {
            return message;
        })

        if(message != null) 
        {
            await Message.destroy({
                where: {
                id: req.body.id
                }
            })
            .then(message => {
                res.status(200).send('La suppression a été effectuée')
                // return message;
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
    getMessages,
    postMessage,
    getMessage,
    updateMessage,
    deleteMessage
}