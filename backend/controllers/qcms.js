const qcms = require('../models/qcms')


async function getqcms(req, res)
{
    return await qcms.findAll();
}

function getqcm (req, res) 
{
    try 
    {

        if(qcms.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(qcms.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postqcm (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newqcm = {            
            //TODO : CLASS FIELDS
        }
        const jane = await qcm.create(newqcm);
        res.status(201).json(newqcm)
    } catch (error) {
        res.status(406)
    }
    
}

async function updateqcm (req, res) 
{

    try 
    {
        
        if(qcms.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await qcm.update(
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

        res.status(200).json('qcm updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deleteqcm (req, res) 
{
    try 
    {

        if(qcms.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await qcm.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('qcm deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getqcms,
    postqcm,
    getqcm,
    updateqcm,
    deleteqcm
}