const sequelize  = require('../models/index');
const {Message} = sequelize.models;


async function getMessages(req, res)
{
    var messagesReq =  await Message.findAll().then(messageArray => {
        return messageArray;
    });

    res.json(messagesReq);
}

async function getMessage (req, res) 
{
    
    try 
    {
        const messageReq = await Message.findOne({ where: {id:req.params.id }})
        .then(message => {
            return message;
        });

        console.log(messageReq);

        if(messageReq == null) 
        {
            res.status(404).send('Ce message n\'existe pas');
        }
        else
        {
            res.status(200).send(messageReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postMessage (req, res) 
{
    if(!req.body.text || !req.body.id_topic || !req.body.id_user)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newMessage = {            
            text: req.body.text,
            id_topic: req.body.id_topic,
            id_user: req.body.id_user
        }
        await Message.create(newMessage)
        .then(message => {
            if(message == null) 
            {
                res.status(406).send('Error');
            }else{
                res.status(201).json(message)
            }
        })
        // .catch(err => {
        //     res.status(406).send('Cette adresse email est déjà utilisée');
    
        // });
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
                    id: req.params.id
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
       const message = await Message.findOne({ where: {id: req.params.id }})
        .then(message => {
            return message;
        })

        if(message != null) 
        {
            await Message.destroy({
                where: {
                id: req.params.id
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