const sequelize  = require('../models/index');
const {Answer} = sequelize.models;


async function getAnswers(req, res)
{
    var answersReq =  await Answer.findAll().then(answerArray => {
        return answerArray;
    });

    res.json(answersReq);
}

async function getAnswer (req, res) 
{
    
    try 
    {
        const answerReq = await Answer.findOne({ where: {id:req.params.id }})
        .then(answer => {
            return answer;
        });

        console.log(answerReq);

        if(answerReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(answerReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postAnswer (req, res) 
{
    const newAnswer = {            
        text: req.body.text,
        isCorrect_answer: req.body.isCorrect_answer
    }

    await Answer.create(newAnswer)
    .then(answer => {
        res.status(201).json(answer)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateAnswer (req, res) 
{
    try 
    {
        const answer = await Answer.findOne({ where: {id: req.params.id }})
        .then(answer => {
            return answer;
        })

        if(answer == null) 
        {
            res.status(404).send('La réponse n\'existe pas');
        }
        else
        {

            await Answer.update(
                { 
                    id: req.body.id,
                    text: req.body.text,
                    isCorrect_answer: req.body.isCorrect_answer
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(answer => {
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

async function deleteAnswer (req, res) 
{
    try 
    {
       const answer = await Answer.findOne({ where: {id: req.params.id }})
        .then(answer => {
            return answer;
        })

        if(answer != null) 
        {
            await Answer.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(answer => {
                res.status(200).send('La suppression a été effectuée')
                // return answer;
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
    getAnswers,
    postAnswer,
    getAnswer,
    updateAnswer,
    deleteAnswer
}