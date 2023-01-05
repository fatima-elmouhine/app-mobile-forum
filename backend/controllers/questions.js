const sequelize  = require('../models/index');
const {Question} = sequelize.models;


async function getQuestions(req, res)
{
    var questionsReq =  await Question.findAll().then(questionArray => {
        return questionArray;
    });

    res.json(questionsReq);
}

async function getQuestion (req, res) 
{
    
    try 
    {
        const questionReq = await Question.findOne({ where: {id:req.params.id }})
        .then(question => {
            return question;
        });

        console.log(questionReq);

        if(questionReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(questionReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postQuestion (req, res) 
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

async function updateQuestion (req, res) 
{
    try 
    {
        const question = await Question.findOne({ where: {id: req.params.id }})
        .then(question => {
            return question;
        })

        if(question == null) 
        {
            res.status(404).send('La réponse n\'existe pas');
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
                    id: req.params.id
                }})
                .then(question => {
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