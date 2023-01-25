const express = require('express');
const router = express.Router();
const auth = require("../Tools/auth");
const {getCourses, postCourse, getCourse, updateCourse, deleteCourse} = require('../controllers/courses')

router.get('/', getCourses);

router.get('/:id', getCourse);

router.post('/', postCourse);

router.put('/', auth, updateCourse);

router.delete('/', auth, deleteCourse);

module.exports = router;