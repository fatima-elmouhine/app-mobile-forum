const sequelize  = require('../models/index');
const {Course} = sequelize.models;


async function getCourses(req, res)
{
    var coursesReq =  await Course.findAll().then(courseArray => {
        return courseArray;
    });

    res.json(coursesReq);
}

async function getCourse (req, res) 
{
    
    try 
    {
        const courseReq = await Course.findOne({ where: {id:req.params.id }})
        .then(course => {
            return course;
        });

        console.log(courseReq);

        if(courseReq == null) 
        {
            res.status(404).send('Artefact not found');
        }
        else
        {
            res.status(200).send(courseReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postCourse (req, res) 
{
    if(!req.body.link || !req.body.id_theme)
    {
        res.status(406).send('Les champs doivent être tous remplis');
    }
    else
    {
        const newCourse = {            
            link: req.body.link,
            id_theme: req.body.id_theme
        }
    }

    await Course.create(newCourse)
    .then(course => {
        res.status(201).json(course)
    })
    .catch(err => {
        res.status(406).send('Cette adresse email est déjà utilisée');

    });

}

async function updateCourse (req, res) 
{
    try 
    {
        const course = await Course.findOne({ where: {id: req.params.id }})
        .then(course => {
            return course;
        })

        if(course == null) 
        {
            res.status(404).send('L\'artefact n\'existe pas');
        }
        else
        {
            if(!req.body.link || !req.body.id_theme || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await Course.update(
                { 
                    id: req.body.id,
                    link: req.body.link,
                    id_theme:req.body.id_theme
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(course => {
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

async function deleteCourse (req, res) 
{
    try 
    {
       const course = await Course.findOne({ where: {id: req.params.id }})
        .then(course => {
            return course;
        })

        if(course != null) 
        {
            await Course.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(course => {
                res.status(200).send('La suppression a été effectuée')
                // return course;
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
    getCourses,
    postCourse,
    getCourse,
    updateCourse,
    deleteCourse
}