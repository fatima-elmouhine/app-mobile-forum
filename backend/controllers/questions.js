const sequelize  = require('../models/index');
const {Question, Answer} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');



async function getQuestions(req, res)
{
    try {
        const questions = await genericGetAll(Question, req);
        res.status(200).json(questions);    
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getQuestion (req, res) 
{
    try 
    {
        const question = await genericGetOne(Question, req);
        if (question === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(question);
    }
    catch (error) {
        res.status(500).send(error);
    }   
}

async function postQuestion (req, res) 
{
    if(!req.body.text || !req.body.id_theme)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newQuestion = {
            text: req.body.text,
            id_theme: req.body.id_theme
        }
        await Question.create(newQuestion)
        .then(question => {
            res.status(201).json(question)
        })
        .catch(err => {
            res.status(406).send('Cette adresse email est déjà utilisée');
        });
    }
}

async function updateQuestion (req, res) 
{
    console.log('body',req.body);
    try 
    {
        const question = await Question.findOne({ where: {id: req.body.id }})
        .then(question => {
            return question;
        })

        if(question == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.text || !req.body.id_theme || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Question.update(
                { 
                    id: req.body.id,
                    text: req.body.text,
                    id_theme: req.body.id_theme
                }, 
                {
                where: 
                {
                    id: req.body.id
                }})
                .then(question => {
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

async function deleteQuestion (req, res) 
{
    try 
    {
       const question = await Question.findOne({ where: {id: req.params.id }})
        .then(question => {
            return question;
        })

        if(question != null) 
        {
            await Question.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(question => {
                res.status(200).send('La suppression a été effectuée')
                // return question;
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
    getQuestions,
    postQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion
}