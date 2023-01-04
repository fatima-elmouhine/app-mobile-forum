const courses = require('../models/courses')


async function getcourses(req, res)
{
    return await courses.findAll();
}

function getcourse (req, res) 
{
    try 
    {

        if(courses.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(courses.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postcourse (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newcourse = {            
            //TODO : CLASS FIELDS
        }
        const jane = await course.create(newcourse);
        res.status(201).json(newcourse)
    } catch (error) {
        res.status(406)
    }
    
}

async function updatecourse (req, res) 
{

    try 
    {
        
        if(courses.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await course.update(
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

        res.status(200).json('course updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deletecourse (req, res) 
{
    try 
    {

        if(courses.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await course.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('course deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getcourses,
    postcourse,
    getcourse,
    updatecourse,
    deletecourse
}