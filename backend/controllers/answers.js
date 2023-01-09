const sequelize  = require('../models/index');
const {Answer, Question, QuestionAnswered} = sequelize.models;


async function getAnswers(req, res)
{
    try {
        const answers = await Answer.findAll({ include: Question});
        res.status(200).json(answers);
    }
    catch (error) {
        res.status(500).send(error);
    }

}

async function getAnswer (req, res) 
{
    try 
    {
        const answer = await Answer.findOne({ where: {id: req.params.id }, include: Question})
        if (answer === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(answer);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function postAnswer (req, res) 
{
    if(!req.body.text || !req.body.isCorrect_answer) return res.status(406).json('Les champs doivent être tous remplis');
    try {
        const question = await Question.findOne({ where: {id: req.params.id_question }});
        if (question == null) return res.status(404).json('La question n\'existe pas');
        const answer = await Answer.create({
            text: req.body.text,
            isCorrect_answer: req.body.isCorrect_answer,
        });
        await QuestionAnswered.create({
            QuestionId: req.params.id_question,
            AnswerId: answer.id
        });
        res.status(200).json({question, answer})
    }
    catch (error) {
        res.json('error');
    }
    
}

async function updateAnswer (req, res) 
{
    if(!req.body.text || req.body.isCorrect_answer === undefined ) return res.status(406).json('Les champs doivent être tous remplis');
    try 
    {
        let answer = await Answer.findOne({ where: {id: req.params.id }})
        if (answer === null) return res.status(404).json('La réponse n\'existe pas');
        await Answer.update({
            text: req.body.text,
            isCorrect_answer: req.body.isCorrect_answer,
        }, {where: {id: req.params.id}})
        res.status(200).json({id:answer.id, text: req.body.text, isCorrect_answer: req.body.isCorrect_answer});
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function deleteAnswer (req, res) 
{
    try {
        let answer = await Answer.findOne({ where: {id: req.params.id }})
        if (answer === null) return res.status(404).json('La réponse n\'existe pas');
        answer = await Answer.destroy({where: {id: req.params.id}})
        res.status(200).json(answer);
    }
    catch (error) {
        res.status(500).send
    }
}


module.exports = {
    getAnswers,
    postAnswer,
    getAnswer,
    updateAnswer,
    deleteAnswer
}