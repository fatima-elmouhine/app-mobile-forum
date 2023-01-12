const express = require('express');
const router = express.Router();
const {getSearchForum,getSearchCourses} = require('../controllers/search')


router.get('/forum', getSearchForum);
router.get('/courses', getSearchCourses)
module.exports = router;