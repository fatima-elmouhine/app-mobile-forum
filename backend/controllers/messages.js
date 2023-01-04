const messages = require('../models/messages')


async function getmessages(req, res)
{
    return await messages.findAll();
}

function getmessage (req, res) 
{
    try 
    {

        if(messages.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(messages.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postmessage (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newmessage = {            
            //TODO : CLASS FIELDS
        }
        const jane = await message.create(newmessage);
        res.status(201).json(newmessage)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatemessage (req, res) 
{

    try 
    {
        
        if(messages.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await message.update(
            { 
                id: req.body.id,
                //TODO : CLASS FIELDS
            }, 
            {
                where: 
                {
                    id: req.body.id
                }
            }
        );

        res.status(200).json('message updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletemessage (req, res) 
{
    try 
    {

        if(messages.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await message.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('message deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getmessages,
    postmessage,
    getmessage,
    updatemessage,
    deletemessage
}