const sequelize  = require('../models/index');
const {Qcm} = sequelize.models;


async function getQcms(req, res)
{
    var qcmsReq =  await Qcm.findAll().then(qcmArray => {
        return qcmArray;
    });

    res.json(qcmsReq);
}

async function getQcm (req, res) 
{
    
    try 
    {
        const qcmReq = await Qcm.findOne({ where: {id:req.params.id }})
        .then(qcm => {
            return qcm;
        });

        console.log(qcmReq);

        if(qcmReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(qcmReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postQcm (req, res) 
{
    if(!req.body.title || !req.body.isGenerated || !req.body.id_type || !req.body.id_user)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newQcm = {            
            title: req.body.title,
            isGenerated: req.body.isGenerated,
            id_type: req.body.id_type,
            id_user: req.body.id_user
        }
    }

    await Qcm.create(newQcm)
    .then(qcm => {
        res.status(201).json(qcm)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateQcm (req, res) 
{
    try 
    {
        const qcm = await Qcm.findOne({ where: {id: req.params.id }})
        .then(qcm => {
            return qcm;
        })

        if(qcm == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.title || !req.body.isGenerated || !req.body.id_type 
                || !req.body.id_user || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Qcm.update(
                { 
                    id: req.body.id,
                    title: req.body.title,
                    isGenerated: req.body.isGenerated,
                    id_type: req.body.id_type,
                    id_user: req.body.id_user
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(qcm => {
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

async function deleteQcm (req, res) 
{
    try 
    {
       const qcm = await Qcm.findOne({ where: {id: req.params.id }})
        .then(qcm => {
            return qcm;
        })

        if(qcm != null) 
        {
            await Qcm.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(qcm => {
                res.status(200).send('La suppression a été effectuée')
                // return qcm;
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
    getQcms,
    postQcm,
    getQcm,
    updateQcm,
    deleteQcm
}