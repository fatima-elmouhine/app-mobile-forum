const themes = require('../models/themes')


async function getthemes(req, res)
{
    return await themes.findAll();
}

function gettheme (req, res) 
{
    try 
    {

        if(themes.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(themes.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function posttheme (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newtheme = {            
            //TODO : CLASS FIELDS 
        }
        const jane = await theme.create(newtheme);
        res.status(201).json(newtheme)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatetheme (req, res) 
{

    try 
    {
        
        if(themes.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await theme.update(
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

        res.status(200).json('theme updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletetheme (req, res) 
{
    try 
    {

        if(themes.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await theme.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('theme deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getthemes,
    posttheme,
    gettheme,
    updatetheme,
    deletetheme
}