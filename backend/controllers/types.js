const types = require('../models/types')

async function gettypes(req, res)
{
    return await types.findAll();
}

function gettype (req, res) 
{
    try 
    {

        if(types.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(types.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

function logintype (req, res) 
{
    try 
    {
        if(emailExist(req.body.email)) throw new Error('Error');
        //TODO :DEHASH PASSWORD
        if(types.findOne({ where: {password: req.body.password }}) == null) throw new Error('Error');
        //FAIRE TON TRUC DE JWT
    } catch (error) {
        res.status(406)
    }
}

async function posttype (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newtype = {            
            type_name: req.body.type_name
        }
        const jane = await type.create(newtype);
        res.status(201).json(newtype)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatetype (req, res) 
{

    try 
    {
        
        if(types.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await type.update(
            { 
                id: req.body.id,
                type_name: req.body.type_name
            }, 
            {
                where: 
                {
                    id: req.body.id
                }
            }
        );

        res.status(200).json('type updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletetype (req, res) 
{
    try 
    {

        if(types.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await type.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('type deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    gettypes,
    posttype,
    logintype,
    gettype,
    updatetype,
    deletetype
}