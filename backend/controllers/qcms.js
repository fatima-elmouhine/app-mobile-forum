const sequelize  = require('../models/index');
const {Qcm, Type, Question, Message, QuestionAnswered, Theme, User, Answer, UserQcm, Result} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');


async function getQcms(req, res)
{
    try {
        const qcms = await genericGetAll(Qcm, req);
        res.status(200).json(qcms);    
    } catch (error) {
        res.status(500).send(error);
    }

}

async function getQcm (req, res) 
{
    const letterArray = ['A', 'B', 'C', 'D', 'E'];
    try 
    {
        const qcm = await Qcm.findAll({
            where : {id: req.params.id},
            include: {model: Question, include: Answer},
            order: [[sequelize.random()]],
        })
        if (qcm === null) return res.status(404).json('La réponse n\'existe pas');

        var arrayAnswers = [{}];
        var arrayGoodAnswers =[{}]
        qcm[0]['dataValues']['Questions'].forEach((element) => {
            const numberGoodAnswers = element.Answers.filter(answer => answer.isCorrect_answer === true).length;
           
            // console.log('numberGoodAnswers',numberGoodAnswers);
            arrayAnswers = [
                ...arrayAnswers,
                arrayAnswers[element.id] =
                {
                    questionId:element.id,
                    numberOfGoodAnswers:numberGoodAnswers,
                    // arrayGoodAnswers:element.Answers.filter(answer => answer.isCorrect_answer === true),
                    A:element.Answers[0].isCorrect_answer,
                    B:element.Answers[1].isCorrect_answer,
                    C:element.Answers[2].isCorrect_answer,
                    D:element.Answers[3].isCorrect_answer,
                    E:element.Answers[4].isCorrect_answer,
                }
            ]

        });
        for (let i = 0; i < arrayAnswers.length; i++) {
            for (let j = 0; j < letterArray.length; j++) {
                if (arrayAnswers[i][letterArray[j]] === true) {                

                    if (arrayGoodAnswers[i]?.questionId == arrayAnswers[i].questionId) {
                        arrayGoodAnswers[i].letter.push(letterArray[j]);
                        
                    }else{
                        arrayGoodAnswers = [
                            ...arrayGoodAnswers,
                            arrayGoodAnswers[arrayAnswers[i].questionId] =
                            {
                                questionId:arrayAnswers[i].questionId,
                                letter:[letterArray[j]],
                            }
                        ]
                    }
                    
                    
                } 
            }

            
            
        }
        console.log('arrayAnswers',arrayGoodAnswers);

        res.status(200).json(
            {
                qcm: qcm,
                answers: arrayGoodAnswers
            }
        );
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

async function postQcm (req, res) 
{
    try {
        //if (!req.body.title || !req.body.isGenerated === undefined || !req.body.id_type || !req.body.id_user) return res.status(406).json('Les champs doivent être tous remplis');
        const qcm = await Qcm.create({
            title: req.body.title,
            isGenerated: req.body.isGenerated,
            id_type: req.body.id_type,
            // TODO : id_user to token
            id_user: req.body.id_user
        });
        res.status(200).json(qcm);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function updateQcm (req, res) 
{
    try {
        const qcm = await Qcm.update({
            title: req.body.title,
            isGenerated: req.body.isGenerated,
            id_type: req.body.id_type,
            // TODO : id_user to token
            id_user: req.body.id_user
        }, {where: {id: req.body.id}});
        if (!qcm[0]) throw new Error('Aucun QCM trouvé');
        res.status(200).json({"id":req.body.id, "title": req.body.title, "isGenerated": req.body.isGenerated, "id_type":req.body.id_type , id_user: req.body.id_user});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function deleteQcm (req, res) 
{
    try {
        const qcm = await Qcm.destroy({where: {id: req.body.id}});
        if (!qcm) throw new Error('Aucun QCM trouvé');
        res.status(200).json({message : "Le Qcm" + req.body.id + " a été supprimé"});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

async function playGame (req, res)
{
    try {

        const userId = req.body.id_user;
        const qcmId = req.body.id_qcm;
        const textStucture = req.body.text_structure;
        const textResponse = req.body.text_response;
        const errorsArray = req.body.errorArray;

        const userGame = await UserQcm.create({
            text_response: textResponse,
            text_structure: textStucture,
            id_user: userId,
            id_qcm: qcmId,       
        });
        
        const userQcmId = userGame['dataValues']['id'];
        for (let i = 0; i < errorsArray.length; i++) {
            const element = errorsArray[i];
            await Result.create({
                result : element.score,
                id_question : element.questionID,
                id_user_qcm : userQcmId,
            })
            
            
        }
        
        res.send('Votre partie a bien été enregistré')
    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports = {
    getQcms,
    postQcm,
    getQcm,
    updateQcm,
    deleteQcm,
    playGame
}