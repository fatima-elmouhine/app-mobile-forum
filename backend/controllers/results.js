const sequelize  = require('../models/index');
const {Result} = sequelize.models;


async function getResults(req, res)
{
    var resultsReq =  await Result.findAll().then(resultArray => {
        return resultArray;
    });

    res.json(resultsReq);
}

async function getResult (req, res) 
{
    try 
    {
        const result = await genericGetOne(Result, req);
        if (result === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }   
}

async function postResult (req, res) 
{
    if(!req.body.result || !req.body.id_question || !req.body.id_user_qcm)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newResult = {            
            result: req.body.result,
            id_question: req.body.id_question,
            id_user_qcm: req.body.id_user_qcm
        }
    }

    await Result.create(newResult)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateResult (req, res) 
{
    try 
    {
        const result = await Result.findOne({ where: {id: req.params.id }})
        .then(result => {
            return result;
        })

        if(result == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.result || !req.body.id_question || !req.body.id_user_qcm || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Result.update(
                { 
                    id: req.body.id,
                    result: req.body.result,
                    id_question: req.body.id_question,
                    id_user_qcm: req.body.id_user_qcm
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(result => {
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

async function deleteResult (req, res) 
{
    try 
    {
       const result = await Result.findOne({ where: {id: req.params.id }})
        .then(result => {
            return result;
        })

        if(result != null) 
        {
            await Result.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(result => {
                res.status(200).send('La suppression a été effectuée')
                // return result;
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
    getResults,
    postResult,
    getResult,
    updateResult,
    deleteResult
}