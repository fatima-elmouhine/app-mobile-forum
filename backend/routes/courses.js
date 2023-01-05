const {getcourses, postcourse, getcourse, updatecourse, deletecourse} = require('../controllers/courses')

const express = require('express');
const router = express.Router();

router.get('/courses', (req, res) => {
    getcourses(req, res);
});

router.get('/courses/:id', (req, res) => {
    getcourse(req, res);
});

router.post('/courses', (req, res) => {
    postcourse(req, res);
});

router.put('/courses/:id', (req, res) => {
    updatecourse(req, res);
});

router.delete('/courses/:id', (req, res) => {
    deletecourse(req, res);
});

module.exports = router;