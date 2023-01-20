const sequelize  = require('../models/index');
const {Course, Theme} = sequelize.models;
const {genericGetAll, genericGetOne} = require('../Tools/dbTools');



async function getCourses(req, res)
{
    try {
        const courses = await genericGetAll(Course, req);
        res.status(200).json(courses);    
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCourse (req, res) 
{
    try 
    {
        const course = await genericGetOne(Course, req);
        if (course === null) return res.status(404).json('La réponse n\'existe pas');
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

async function postCourse (req, res) 
{
    console.log(req.body);
    try {
        const newCourse = {
            title: req.body.title,
            link: req.body.link,
            id_theme: req.body.id_theme
        }
        const course = await Course.create(newCourse);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

async function updateCourse (req, res) 
{
    try {
        const course = await Course.update({
            title: req.body.title,
            link: req.body.link,
            id_theme: req.body.id_theme
        }, {where: {id: req.body.id}});
        if (!course[0]) throw new Error('Aucun cours trouvé');
        res.status(200).json({"id": req.body.id, "title": req.body.title, "link": req.body.link, "id_theme": req.body.id_theme});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function deleteCourse (req, res) 
{
    try {
        const course = await Course.destroy({where: {id: req.body.id}});
        if (!course) throw new Error('Aucun QCM trouvé');
        res.status(200).json({message : "Le cours " + req.body.id + " a été supprimé"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports = {
    getCourses,
    postCourse,
    getCourse,
    updateCourse,
    deleteCourse
}