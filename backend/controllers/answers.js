const answers = require('../models/answers')


async function getanswers(req, res)
{
    return await answers.findAll();
}

function getanswer (req, res) 
{
    try 
    {

        if(answers.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(answers.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postanswer (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newanswer = {            
            //TODO : CLASS FIELDS
        }
        const jane = await answer.create(newanswer);
        res.status(201).json(newanswer)
    } catch (error) {
        res.status(406)
    }
    
}

async function updateanswer (req, res) 
{

    try 
    {
        
        if(answers.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await answer.update(
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

        res.status(200).json('answer updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deleteanswer (req, res) 
{
    try 
    {

        if(answers.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await answer.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('answer deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getanswers,
    postanswer,
    getanswer,
    updateanswer,
    deleteanswer
}