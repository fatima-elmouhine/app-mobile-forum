const questions = require('../models/questions')


async function getquestions(req, res)
{
    return await questions.findAll();
}

function getquestion (req, res) 
{
    try 
    {

        if(questions.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(questions.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postquestion (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newquestion = {            
            //TODO : CLASS FIELDS
        }
        const jane = await question.create(newquestion);
        res.status(201).json(newquestion)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatequestion (req, res) 
{

    try 
    {
        
        if(questions.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await question.update(
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

        res.status(200).json('question updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletequestion (req, res) 
{
    try 
    {

        if(questions.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await question.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('question deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getquestions,
    postquestion,
    getquestion,
    updatequestion,
    deletequestion
}