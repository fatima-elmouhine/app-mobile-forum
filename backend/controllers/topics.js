const topics = require('../models/topics')


async function gettopics(req, res)
{
    return await topics.findAll();
}

function gettopic (req, res) 
{
    try 
    {

        if(topics.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(topics.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function posttopic (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newtopic = {            
            title: req.body.title,
            id_user: req.body.id_user
        }
        const jane = await topic.create(newtopic);
        res.status(201).json(newtopic)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatetopic (req, res) 
{

    try 
    {
        
        if(topics.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await topic.update(
            { 
                id: req.body.id,
                title: req.body.title,
                id_user: req.body.id_user
            }, 
            {
                where: 
                {
                    id: req.body.id
                }
            }
        );

        res.status(200).json('topic updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletetopic (req, res) 
{
    try 
    {

        if(topics.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await topic.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('topic deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    gettopics,
    posttopic,
    gettopic,
    updatetopic,
    deletetopic
}