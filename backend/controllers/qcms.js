const sequelize  = require('../models/index');
const {Qcm, Question, Answer, QcmQuestion} = sequelize.models;
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
    try 
    {
        const qcm = await Qcm.findAll({
            where : {id: req.params.id},
            include: {model: Question, include: Answer},
            order: [[sequelize.random()]],
        })
        if (qcm === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(qcm);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

async function postQcm (req, res) 
{
    console.log('userTest', req.user);
    try {
        //if (!req.body.title || !req.body.isGenerated === undefined || !req.body.id_type || !req.body.id_user) return res.status(406).json('Les champs doivent être tous remplis');
        const qcm = await Qcm.create({
            title: req.body.title,
            isGenerated: req.body.isGenerated,
            id_type: req.body.id_type,
            // TODO : id_user to token
            id_user: req.user.id
        });
        res.status(200).json(qcm);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function postQcmQuestion (req, res)
{
    try {
        const qcmQuestion = await QcmQuestion.create({
            QcmId: req.body.QcmId,
            QuestionId: req.body.QuestionId
        });
        res.status(200).json(qcmQuestion);
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


module.exports = {
    getQcms,
    postQcm,
    postQcmQuestion,
    getQcm,
    updateQcm,
    deleteQcm
}