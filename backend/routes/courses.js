import {getcourses, postcourse, getcourse, updatecourse, deletecourse} from '../controllers/courses'

const express = require('express');
const router = this.express.Router();

router.get('/courses', (req, res) => {
    getcourses(req, res);
});

router.get('/courses/:id', (req, res) => {
    getcourse(req, res);
});

router.post('/courses', (req, res) => {
    postcourse(req, res);
});

router.update('/courses/:id', (req, res) => {
    updatecourse(req, res);
});

router.delete('/courses/:id', (req, res) => {
    deletecourse(req, res);
});

module.exports = router;