const {getCourses, postCourse, getCourse, updateCourse, deleteCourse} = require('../controllers/courses')

const express = require('express');
const router = express.Router();

router.get('/', getCourses);

router.get('/:id',getCourse);

router.post('/', postCourse);

router.put('/', updateCourse);

router.delete('/', deleteCourse);

module.exports = router;